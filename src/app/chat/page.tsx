
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ContactInfo } from '@/components/ContactList';
import { ChatWindow } from '@/components/ChatWindow';
import { type Contact, type Message, contacts as mockContacts } from '@/lib/mock-data';
import { initAudio, playMessageReceivedSound } from '@/lib/sounds';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { encrypt } from '@/lib/cipher';
import { Users, LogOut } from 'lucide-react';

export default function ChatPage() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    // Select the first contact by default
    if (!selectedContact && contacts.length > 0) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts, selectedContact]);

  const handleSendMessage = useCallback((messageText: string) => {
    if (!selectedContact) return;
    
    const encryptedText = encrypt(messageText);

    const newMessage: Message = {
      id: Date.now(),
      text: `YOU: ${encryptedText}`,
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
        text: `${selectedContact.name.toUpperCase()}: ${encrypt('ROGER THAT! OVER.')}`, // Encrypt reply
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
        className="flex flex-col items-center justify-center min-h-screen cursor-pointer text-center p-4 bg-blue-50"
        onClick={handleInitAudio}
      >
        <Card className="max-w-md bg-white shadow-lg border-none text-slate-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Enable Sound?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">Click here to enable sound notifications for new messages.</p>
            <Button>
              Enable Audio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <main className="p-2 md:p-4 min-h-screen bg-muted/40">
       <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto">
         {/* Sidebar */}
         <aside className="col-span-3">
            <Card className="h-full">
              <CardHeader className='flex-row items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Users className="text-primary" />
                  <CardTitle className='text-xl'>Friends</CardTitle>
                </div>
                 <Button variant="ghost" size="icon" asChild>
                    <a href="/">
                      <LogOut className="text-muted-foreground" />
                    </a>
                 </Button>
              </CardHeader>
              <CardContent>
                 <div className="space-y-2">
                   {contacts.map(contact => (
                     <div 
                        key={contact.id} 
                        onClick={() => setSelectedContact(contact)}
                        className={cn(
                          'cursor-pointer p-3 flex justify-between items-center rounded-lg transition-colors',
                          selectedContact?.id === contact.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                        )}
                      >
                       <span className="font-semibold">{contact.name}</span>
                        <div className='flex items-center gap-2'>
                           <span className={cn('text-xs font-bold', contact.status === 'online' ? 'text-green-500' : 'text-slate-400')}>
                            {contact.status.toUpperCase()}
                           </span>
                           <span className={cn(
                              "w-2 h-2 rounded-full", 
                              contact.status === 'online' ? 'bg-green-500' : 'bg-slate-400'
                            )}>
                           </span>
                        </div>
                     </div>
                   ))}
                 </div>
              </CardContent>
            </Card>
         </aside>

        {/* Main Chat Area */}
        <div className="col-span-6">
            <ChatWindow
              contact={selectedContact}
              onSendMessage={handleSendMessage}
            />
        </div>

        {/* Contact Info */}
        <div className="col-span-3">
          <ContactInfo
            contact={selectedContact}
          />
        </div>
      </div>
    </main>
  );
}
