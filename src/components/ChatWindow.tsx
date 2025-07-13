
'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { Contact } from '@/lib/mock-data';
import { playMessageSentSound } from '@/lib/sounds';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';
import { MessageRenderer } from './MessageRenderer';
import { retroEmojis } from '@/lib/emojiList';

interface ChatWindowProps {
  contact: Contact | null;
  onSendMessage: (message: string) => void;
}

export function ChatWindow({ contact, onSendMessage }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [contact?.messages]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newMessage.trim() && contact) {
      onSendMessage(newMessage);
      setNewMessage('');
      playMessageSentSound();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiSelect = (emojiName: string) => {
    setNewMessage(prev => prev + `:${emojiName.toLowerCase()}:`);
    textAreaRef.current?.focus();
  }

  if (!contact) {
    return (
      <div className="nes-container is-dark is-centered h-full">
        <p>Select a contact to start chatting!</p>
      </div>
    );
  }

  return (
    <div className="nes-container with-title is-dark h-full flex flex-col">
      <p className="title">Chat with {contact.name}</p>
      <div className="flex-grow p-4 overflow-y-auto bg-gray-800/20" ref={scrollAreaRef}>
        <section className="message-list space-y-6">
            {contact.messages.map((msg) => (
               <div key={msg.id} className={`message ${msg.sender === 'me' ? '-right' : '-left'}`}>
                  <div className={`nes-balloon from-${msg.sender === 'me' ? 'right' : 'left'} is-dark`}>
                    <p className="whitespace-pre-wrap text-sm">
                      <MessageRenderer text={msg.text} />
                    </p>
                  </div>
               </div>
            ))}
        </section>
      </div>
      <div className="p-4 border-t-4 border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 w-full">
          <Popover>
            <PopoverTrigger asChild>
               <button type="button" className='nes-btn'>
                 <i className="nes-icon smiley is-small"></i>
               </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto nes-container is-dark">
              <div className="grid grid-cols-6 gap-2">
                {retroEmojis.map(emoji => (
                  <button
                    key={emoji.name}
                    type="button"
                    title={emoji.name}
                    onClick={() => handleEmojiSelect(emoji.name)}
                    className="p-2 hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <Image src={emoji.path} alt={emoji.name} width={24} height={24} />
                    <span className="sr-only">{emoji.name}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <textarea
            ref={textAreaRef}
            placeholder={`Message ${contact.name}...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            className="nes-textarea is-dark flex-grow"
            rows={1}
          />
          <button type="submit" className="nes-btn is-primary" disabled={!newMessage.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
