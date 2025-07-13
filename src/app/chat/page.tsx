
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ContactInfo } from '@/components/ContactList';
import { ChatWindow } from '@/components/ChatWindow';
import { type Contact, type Message, contacts as mockContacts } from '@/lib/mock-data';
import { initAudio, playMessageReceivedSound } from '@/lib/sounds';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function ChatPage() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');

  useEffect(() => {
    // Select the first contact by default
    if (!selectedContact && contacts.length > 0) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts, selectedContact]);

  const handleSendMessage = useCallback((messageText: string) => {
    if (!selectedContact) return;

    const newMessage: Message = {
      id: Date.now(),
      text: `YOU: ${messageText}`,
      sender: 'me',
      timestamp: new Date().toISOString(),
    };

    const updatedContacts = contacts.map(c =>
      c.id === selectedContact.id
        ? { ...c, messages: [...c.messages, newMessage] }
        : c
    );
    setContacts(updatedContacts);
    
    // Simulate receiving a reply
    setTimeout(() => {
      const replyMessage: Message = {
        id: Date.now() + 1,
        text: `${selectedContact.name.toUpperCase()}: ROGER THAT! OVER.`,
        sender: 'contact',
        timestamp: new Date().toISOString(),
      };
      setContacts(prevContacts => prevContacts.map(c => 
        c.id === selectedContact.id
          ? { ...c, messages: [...c.messages, replyMessage] }
          : c
      ));
      if(audioReady) playMessageReceivedSound();
    }, 1500);
  }, [contacts, selectedContact, audioReady]);

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

  if (!audioReady) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-screen cursor-pointer text-center p-4 bg-black"
        onClick={handleInitAudio}
      >
        <Card className="max-w-md bg-transparent border-primary text-primary shadow-[0_0_15px_hsl(var(--primary)/0.5)]">
          <CardHeader>
            <CardTitle className="font-headline text-3xl">INITIALIZE AUDIO TRANSMISSION?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">[CLICK TO ENABLE AUDIO FEEDBACK]</p>
            <Button variant="outline" className="text-primary border-primary hover:bg-primary/20">
              [ Y / N ]
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const themeClass = selectedContact?.status === 'offline' ? 'theme-sepia' : '';

  return (
    <main className={cn("p-2 md:p-4 min-h-screen flex flex-col items-center justify-center", themeClass)}>
      <div className="w-full max-w-7xl terminal-container">
        <header className="flex justify-between items-center text-primary p-1">
          <span>BLTMR PLC 2.4.00</span>
          <span>POLICEMAN INFO:</span>
        </header>
        
        <div className="terminal-panel p-1">
           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-transparent p-0 m-0">
              <TabsTrigger value="chat" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-t-2 border-x-2 border-primary -mb-px">CHAT</TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-none border-t-2 border-x-2 border-primary -mb-px">CONTACTS</TabsTrigger>
              {['LOC', 'DOCUMENTS', 'ORDERS', 'RECORDINGS', 'MAP'].map(tab => (
                 <TabsTrigger key={tab} value={tab} disabled className="rounded-none border-t-2 border-x-2 border-primary -mb-px">{tab}</TabsTrigger>
              ))}
            </TabsList>
            <div className="border-t-2 border-primary">
              <TabsContent value="chat" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 p-2">
                  <div className="lg:col-span-8">
                    <ChatWindow
                      contact={selectedContact}
                      onSendMessage={handleSendMessage}
                    />
                  </div>
                  <div className="lg:col-span-4">
                    <ContactInfo
                      contact={selectedContact}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="contacts" className="mt-0 p-4">
                 <div className="text-primary space-y-2">
                   {contacts.map(contact => (
                     <div 
                        key={contact.id} 
                        onClick={() => { setSelectedContact(contact); setActiveTab('chat')}}
                        className={`cursor-pointer p-2 flex justify-between items-center ${selectedContact?.id === contact.id ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/20'}`}
                      >
                       <span>&gt; {contact.name.toUpperCase()}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          contact.status === 'online'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {contact.status.toUpperCase()}
                        </span>
                     </div>
                   ))}
                 </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <footer className="flex justify-between items-center text-primary p-1">
            <span>{selectedContact?.status === 'online' ? 'SIGNAL: STRONG' : 'SIGNAL: WEAK'}</span>
            <span>PROPERTY OF BALTIMORE POLICE DEPARTMENT</span>
        </footer>
      </div>
    </main>
  );
}
