
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ChatWindow } from '@/components/ChatWindow';
import { type Contact, type Message, contacts as mockContacts, users as allUsers, requests as mockRequests } from '@/lib/mock-data';
import { initAudio, playMessageReceivedSound } from '@/lib/sounds';
import { UserPlusIcon } from '@/components/icons/UserPlusIcon';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SettingsIcon } from '@/components/icons/SettingsIcon';

export default function ChatPage() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [requests, setRequests] = useState(mockRequests);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const [theme, setTheme] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = searchTerm
    ? allUsers.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  useEffect(() => {
    if (!selectedContact && contacts.length > 0) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts, selectedContact]);

  useEffect(() => {
    if (selectedContact) {
      setTheme(selectedContact.status === 'online' ? '' : 'theme-sepia');
    }
  }, [selectedContact]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.className = '';
      if(theme) {
        document.body.classList.add(theme);
      }
    }
  }, [theme]);

  const handleSendMessage = useCallback((messageText: string) => {
    if (!selectedContact) return;
    console.log(`Sending message to ${selectedContact.name}: ${messageText}`);
    // In a real app, this would call a server action.
    // For now, let's just optimistically update the UI.
     const newMessage: Message = {
      id: Date.now(),
      text: `YOU: ${messageText}`, // We'll skip encryption here since the backend would handle it
      sender: 'me',
      timestamp: new Date().toISOString(),
    };
     setContacts(prevContacts => prevContacts.map(c => 
        c.id === selectedContact.id
          ? { ...c, messages: [...c.messages, newMessage] }
          : c
      ));
  }, [selectedContact]);

  useEffect(() => {
    if (selectedContact) {
      const updatedContact = contacts.find(c => c.id === selectedContact.id);
      if (updatedContact) {
        setSelectedContact(updatedContact);
      }
    }
  }, [contacts, selectedContact?.id]);

  const handleInitAudio = async () => {
    await initAudio();
    setAudioReady(true);
  };

  const handleSendRequest = (userId: string) => {
    console.log(`Friend request sent to user ${userId}`);
    // Real implementation would use a server action
  };
  
  const handleAcceptRequest = (userId: string) => {
    console.log(`Friend request from ${userId} accepted.`);
    setRequests(prev => prev.filter(r => r.id !== userId));
     const newContact = allUsers.find(u => u.id === userId);
     if (newContact) {
        // @ts-ignore
        setContacts(prev => [...prev, { ...newContact, messages: [], status: 'offline', avatar: 'https://placehold.co/96x96.png', associates: 'Unknown', bio: 'Newly added contact.' }]);
     }
  };

  const handleDeclineRequest = (userId: string) => {
    console.log(`Friend request from ${userId} declined.`);
    setRequests(prev => prev.filter(r => r.id !== userId));
  };


  if (!audioReady) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen cursor-pointer text-center p-4 bg-black text-primary"
        onClick={handleInitAudio}
      >
        <div className="border p-8 border-primary" style={{boxShadow: '0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)) inset'}}>
            <h2 className="text-2xl md:text-3xl mb-4 tracking-widest">INITIALIZE AUDIO TRANSMISSION?</h2>
            <p className='mb-6 text-sm'>[CLICK TO ENABLE AUDIO FEEDBACK]</p>
            <div className="inline-block border border-primary bg-black px-4 py-2 text-lg">
              [ Y / N ]
            </div>
        </div>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 h-screen">

        {/* Sidebar with Tabs */}
        <aside className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-primary/30 flex flex-col">
          <Tabs defaultValue="contacts" className="h-full flex flex-col">
            <TabsList className="w-full justify-start rounded-none flex-shrink-0">
              <TabsTrigger value="contacts" className="text-base">CONTACTS</TabsTrigger>
              <TabsTrigger value="requests" className="text-base">REQUESTS ({requests.length})</TabsTrigger>
              <TabsTrigger value="find" className="text-base">FIND USER</TabsTrigger>
            </TabsList>

            <TabsContent value="contacts" className="flex-grow overflow-y-auto p-4 bg-background/20">
              <div className="space-y-2">
                {contacts.map(contact => (
                  <div 
                    key={contact.id} 
                    onClick={() => setSelectedContact(contact)}
                    className={`cursor-pointer p-2 flex justify-between items-center ${selectedContact?.id === contact.id ? 'bg-primary/20' : 'hover:bg-primary/10'}`}
                  >
                    <span className={`${selectedContact?.id === contact.id ? 'text-accent-foreground' : 'text-primary'}`}>{contact.name}</span>
                    <span className={`text-xs ${contact.status === 'online' ? 'text-primary' : 'text-primary/50'}`}>
                      {contact.status.toUpperCase()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                  <Link href="/settings" className="text-primary/50 hover:text-primary text-sm flex items-center justify-center gap-2">
                       <SettingsIcon className="w-4 h-4" />
                       SETTINGS
                  </Link>
              </div>
            </TabsContent>

             <TabsContent value="requests" className="flex-grow overflow-y-auto p-4 bg-background/20 space-y-3">
              {requests.length > 0 ? requests.map(req => (
                <div key={req.id} className="p-2 border border-primary/20">
                  <p className="text-primary mb-2">{req.name} wants to connect.</p>
                  <div className="flex gap-2">
                    <Button onClick={() => handleAcceptRequest(req.id)} size="sm" variant="ghost" className="text-xs p-1 h-auto hover:bg-primary/20">ACCEPT</Button>
                    <Button onClick={() => handleDeclineRequest(req.id)} size="sm" variant="ghost" className="text-xs p-1 h-auto hover:bg-destructive/20 hover:text-destructive">DECLINE</Button>
                  </div>
                </div>
              )) : (
                <p className="text-primary/50 text-center text-sm pt-4">NO PENDING REQUESTS</p>
              )}
            </TabsContent>

             <TabsContent value="find" className="flex-grow overflow-y-auto p-4 bg-background/20">
                <div className="space-y-4">
                    <Input 
                        type="text" 
                        placeholder="Search by callsign..." 
                        className="bg-input border-primary/30 text-primary h-9"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <div className="space-y-2">
                        {filteredUsers.map(user => (
                            <div key={user.id} className="p-2 border border-primary/20 flex justify-between items-center">
                                <div>
                                    <p className="text-primary">{user.name}</p>
                                    <p className="text-primary/50 text-xs">{user.username}</p>
                                </div>
                                <Button size="sm" variant="ghost" className="p-1 h-auto" onClick={() => handleSendRequest(user.id)}>
                                    <UserPlusIcon className="w-5 h-5" />
                                </Button>
                            </div>
                        ))}
                         {searchTerm && filteredUsers.length === 0 && (
                            <p className="text-primary/50 text-center text-sm pt-4">NO USERS FOUND</p>
                         )}
                    </div>
                </div>
            </TabsContent>

          </Tabs>
        </aside>

        {/* Main Chat Area */}
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
          <ChatWindow
            contact={selectedContact}
            onSendMessage={handleSendMessage}
          />
        </div>

      </div>
    </main>
  );
}
