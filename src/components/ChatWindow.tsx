'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { Contact } from '@/lib/mock-data';
import { playMessageSentSound } from '@/lib/sounds';

interface ChatWindowProps {
  contact: Contact | null;
  onSendMessage: (message: string) => void;
}

export function ChatWindow({ contact, onSendMessage }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [contact?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && contact) {
      onSendMessage(newMessage);
      setNewMessage('');
      playMessageSentSound();
    }
  };

  if (!contact) {
    return (
      <div className="nes-container is-dark with-title is-centered h-full flex items-center justify-center">
        <p className="title">Chat</p>
        <p>Select a contact to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="nes-container is-dark with-title h-[80vh] flex flex-col">
      <p className="title">{contact.name}</p>
      <div
        ref={chatContainerRef}
        className="flex-grow p-4 overflow-y-auto bg-[#212529] mb-4 message-list"
        style={{ imageRendering: 'pixelated' }}
      >
        {contact.messages.map((msg) => (
          <section key={msg.id} className={`message -${msg.sender === 'me' ? 'right' : 'left'}`}>
            <div className={`nes-balloon from-${msg.sender === 'me' ? 'right' : 'left'} is-dark`}>
              <p>{msg.text}</p>
            </div>
          </section>
        ))}
      </div>
      <form onSubmit={handleSendMessage}>
        <div className="nes-field is-inline">
          <input
            type="text"
            id="message_field"
            className="nes-input is-dark"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            autoComplete="off"
          />
          <button type="submit" className="nes-btn is-primary">
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
