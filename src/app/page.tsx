'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ContactList } from '@/components/ContactList';
import { ChatWindow } from '@/components/ChatWindow';
import { type Contact, type Message, contacts as mockContacts } from '@/lib/mock-data';
import { initAudio, playMessageReceivedSound } from '@/lib/sounds';

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    if (!selectedContact && contacts.length > 0) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts, selectedContact]);

  const handleSendMessage = useCallback((messageText: string) => {
    if (!selectedContact) return;

    const newMessage: Message = {
      id: Date.now(),
      text: messageText,
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
        text: 'Roger that! Over.',
        sender: 'contact',
        timestamp: new Date().toISOString(),
      };
      setContacts(prevContacts => prevContacts.map(c => 
        c.id === selectedContact.id
          ? { ...c, messages: [...c.messages, replyMessage] }
          : c
      ));
      playMessageReceivedSound();
    }, 1500);
  }, [contacts, selectedContact]);

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
        className="flex items-center justify-center min-h-screen cursor-pointer"
        style={{ backgroundColor: '#191970', color: 'white' }}
        onClick={handleInitAudio}
      >
        <div className="nes-container is-dark is-centered">
          <p>Click to start Retro Messenger</p>
        </div>
      </div>
    );
  }

  return (
    <main className="p-4 md:p-8 min-h-screen">
      <div className="nes-container is-dark with-title">
        <h1 className="title">
          <i className="nes-icon lock is-small"></i> Retro Messenger
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
            <ContactList
              contacts={contacts}
              selectedContact={selectedContact}
              onSelectContact={setSelectedContact}
            />
          </div>
          <div className="lg:col-span-8">
            <ChatWindow
              contact={selectedContact}
              onSendMessage={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
