
'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { Contact } from '@/lib/mock-data';
import { playMessageSentSound } from '@/lib/sounds';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';
import { MessageRenderer } from './MessageRenderer';
import { retroEmojis } from '@/lib/emojiList';
import { SmileIcon } from './icons/SmileIcon';
import { SendIcon } from './icons/SendIcon';

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
      <div className="border border-primary/30 h-full flex items-center justify-center bg-background/20">
        <p className="text-primary">Select a contact to start messaging.</p>
      </div>
    );
  }

  return (
    <div className="border border-primary/30 h-full flex flex-col bg-background/20">
      <div className="p-4 border-b-2 border-primary/30">
        <h2 className="text-xl text-primary">Chat with {contact.name}</h2>
      </div>
      <div className="flex-grow p-4 overflow-y-auto" ref={scrollAreaRef}>
        <div className="space-y-4">
            {contact.messages.map((msg, index) => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 max-w-xs md:max-w-md ${msg.sender === 'me' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                      <p className="whitespace-pre-wrap text-sm">
                        <MessageRenderer text={msg.text} />
                      </p>
                    </div>
                </div>
            ))}
        </div>
      </div>
      <div className="p-4 border-t-2 border-primary/30">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
           <Popover>
            <PopoverTrigger asChild>
               <button type="button" className='p-2 hover:bg-primary/20 text-primary'>
                 <SmileIcon />
               </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto border-primary/30 bg-popover">
              <div className="grid grid-cols-6 gap-1">
                {retroEmojis.map(emoji => (
                  <button
                    key={emoji.name}
                    type="button"
                    title={emoji.name}
                    onClick={() => handleEmojiSelect(emoji.name)}
                    className="p-2 hover:bg-primary/20 rounded-sm"
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
            placeholder={`MESSAGE ${contact.name.toUpperCase()}...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            className="w-full bg-input text-primary p-2 flex-grow border border-primary/30 focus:ring-1 focus:ring-ring focus:outline-none"
            rows={1}
          />
          <button type="submit" className="p-2 bg-primary text-primary-foreground hover:bg-primary/80 disabled:opacity-50" disabled={!newMessage.trim()}>
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
