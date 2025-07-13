'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { Contact } from '@/lib/mock-data';
import { playMessageSentSound } from '@/lib/sounds';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
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

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
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
  
  const handleEmojiSelect = (emojiName: string) => {
    setNewMessage(prev => prev + `:${emojiName.toLowerCase()}:`);
  }

  if (!contact) {
    return (
      <div className="h-full flex items-center justify-center terminal-panel">
        <p>SELECT A CONTACT TO BEGIN COMMUNICATION.</p>
      </div>
    );
  }

  return (
    <div className="h-[70vh] flex flex-col gap-2">
      <ScrollArea className="flex-grow terminal-panel p-2" ref={scrollAreaRef}>
        <div className="space-y-2 font-mono text-lg">
          {contact.messages.map((msg) => (
             <p key={msg.id} className="whitespace-pre-wrap">
               <MessageRenderer text={msg.text} />
             </p>
          ))}
        </div>
      </ScrollArea>
      <form onSubmit={handleSendMessage} className="flex flex-col gap-2">
        <Textarea
          placeholder="DON'T THINK TOO MUCH ABOUT IT|"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          autoComplete="off"
          className="flex-grow bg-black/50 border-primary rounded-none h-24 resize-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
        />
        <div className="flex gap-2">
           <Popover>
            <PopoverTrigger asChild>
               <div className="terminal-panel p-1 flex-grow grid grid-cols-6 gap-1">
                 {retroEmojis.slice(0, 6).map(emoji => (
                   <button
                    key={emoji.name}
                    type="button"
                    title={emoji.name}
                    className="p-1 hover:bg-primary/20 flex justify-center items-center"
                  >
                     <Image src={emoji.path} alt={emoji.name} width={24} height={24} />
                   </button>
                 ))}
               </div>
            </PopoverTrigger>
            <PopoverContent className="bg-black border-primary w-auto">
              <div className="grid grid-cols-6 gap-2 text-lg font-body">
                {retroEmojis.map(emoji => (
                  <button
                    key={emoji.name}
                    type="button"
                    title={emoji.name}
                    onClick={() => handleEmojiSelect(emoji.name)}
                    className="rounded-none p-2 hover:bg-primary/20 transition-colors"
                  >
                    <Image src={emoji.path} alt={emoji.name} width={24} height={24} />
                    <span className="sr-only">{emoji.name}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Button type="submit" className="bg-black/50 border-primary rounded-none h-full px-8 text-lg hover:bg-primary/20">
            SEND
          </Button>
        </div>
      </form>
    </div>
  );
}
