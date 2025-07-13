
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

  useEffect(() => {
    // Select the first contact by default
    if (!selectedContact && contacts.length > 0) {
      setSelectedContact(contacts[0]);
    }
  }, [contacts, selectedContact]);

  const handleSendMessage = useCallback((messageText: string) => {
    if (!selectedContact) return;
    
    // In a real E2EE app, you'd use a library like libsignal here.
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
        className="flex flex-col items-center justify-center min-h-screen cursor-pointer text-center p-4"
        onClick={handleInitAudio}
      >
        <div className="nes-container is-dark with-title max-w-md">
            <p className="title">Audio</p>
            <p className='mb-4'>Click to enable sound effects.</p>
            <button className="nes-btn is-primary">
              Enable Audio
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
            <div className="nes-container with-title is-dark h-full">
              <p className='title flex items-center gap-2'>
                <i className="nes-icon is-small star"></i>
                <span>Contacts</span>
                <i className="nes-icon is-small star"></i>
              </p>
              <div className="space-y-2">
                {contacts.map(contact => (
                  <div 
                     key={contact.id} 
                     onClick={() => setSelectedContact(contact)}
                     className={`cursor-pointer p-3 flex justify-between items-center rounded-lg ${selectedContact?.id === contact.id ? 'bg-blue-800' : 'hover:bg-blue-900'}`}
                   >
                    <div className='flex items-center gap-2'>
                       <i className={`nes-icon ${contact.status === 'online' ? 'heart' : 'close'} is-small`}></i>
                       <span className={`nes-text ${selectedContact?.id === contact.id ? 'is-primary' : ''}`}>{contact.name}</span>
                    </div>
                     <span className={`nes-badge ${contact.status === 'online' ? '' : 'is-dark'}`}>
                       <span className={contact.status === 'online' ? 'is-success' : 'is-error'}>{contact.status.toUpperCase()}</span>
                     </span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-6">
                 <Link href="/" className="nes-btn">
                      Log Out
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
