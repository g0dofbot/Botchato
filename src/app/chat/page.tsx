
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ContactInfo } from '@/components/ContactList';
import { ChatWindow } from '@/components/ChatWindow';
import { type Contact, type Message, contacts as mockContacts } from '@/lib/mock-data';
import { initAudio, playMessageReceivedSound } from '@/lib/sounds';
import { encrypt } from '@/lib/cipher';
import { UsersIcon } from '@/components/icons/UsersIcon';
import Link from 'next/link';

export default function ChatPage() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [audioReady, setAudioReady] = useState(false);
  const [theme, setTheme] = useState('theme-green');

  useEffect(() => {
    // Select the first contact by default
    if (!selectedContact && contacts.length > 0) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts, selectedContact]);

  useEffect(() => {
    if (selectedContact) {
      setTheme(selectedContact.status === 'online' ? 'theme-green' : 'theme-sepia');
    }
  }, [selectedContact]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.className = '';
      document.body.classList.add(theme);
    }
  }, [theme]);

  const handleSendMessage = useCallback((messageText: string) => {
    if (!selectedContact) return;
    
    // This is a placeholder for real E2EE. In a real app, you'd use a library like libsignal.
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
        text: `${selectedContact.name.toUpperCase()}: ${encrypt('ROGER THAT! OVER.')}`,
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
        className="flex flex-col items-center justify-center min-h-screen cursor-pointer text-center p-4 bg-background text-primary"
        onClick={handleInitAudio}
      >
        <div className="border p-8 border-primary/50 bg-background/50 max-w-md">
            <h2 className="text-xl mb-4 text-primary">AUDIO SYSTEM OFFLINE</h2>
            <p className='mb-4'>Click to initialize audio hardware.</p>
            <button className="bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/80">
              INITIALIZE
            </button>
        </div>
      </div>
    );
  }
  
  return (
    <main className="p-2 md:p-4 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3">
          <div className="border border-primary/30 p-4 h-full bg-background/20">
            <h2 className="text-lg font-bold mb-4 text-primary flex items-center gap-2">
              <UsersIcon className="w-5 h-5" />
              CONTACTS
            </h2>
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
                <Link href="/" className="text-primary/50 hover:text-primary text-sm">
                     &lt; LOG OUT &gt;
                </Link>
            </div>
          </div>
        </aside>

        {/* Main Chat Area */}
        <div className="col-span-12 md:col-span-6">
          <ChatWindow
            contact={selectedContact}
            onSendMessage={handleSendMessage}
          />
        </div>

        {/* Contact Info */}
        <div className="col-span-12 md:col-span-3">
          <ContactInfo
            contact={selectedContact}
          />
        </div>
      </div>
    </main>
  );
}
