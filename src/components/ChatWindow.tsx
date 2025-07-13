
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
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from './ui/card';
import { Laugh, Send } from 'lucide-react';

interface ChatWindowProps {
  contact: Contact | null;
  onSendMessage: (message: string) => void;
}

export function ChatWindow({ contact, onSendMessage }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);


  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
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
      <Card className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Select a chat to start messaging!</p>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Chat with {contact.name}</CardTitle>
      </CardHeader>
      <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {contact.messages.map((msg) => (
             <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'contact' && (
                    <Image src={contact.avatar} alt={contact.name} width={32} height={32} className="rounded-full"/>
                )}
                <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${msg.sender === 'me' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary rounded-bl-none'}`}>
                  <p className="whitespace-pre-wrap text-sm">
                    <MessageRenderer text={msg.text} />
                  </p>
                </div>
             </div>
          ))}
        </div>
      </ScrollArea>
      <CardFooter>
        <form onSubmit={handleSendMessage} className="flex items-center gap-2 w-full">
          <Popover>
            <PopoverTrigger asChild>
               <Button type="button" variant="ghost" size="icon">
                 <Laugh className="text-muted-foreground"/>
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto">
              <div className="grid grid-cols-6 gap-2">
                {retroEmojis.map(emoji => (
                  <button
                    key={emoji.name}
                    type="button"
                    title={emoji.name}
                    onClick={() => handleEmojiSelect(emoji.name)}
                    className="p-2 hover:bg-accent rounded-md transition-colors"
                  >
                    <Image src={emoji.path} alt={emoji.name} width={24} height={24} />
                    <span className="sr-only">{emoji.name}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Textarea
            ref={textAreaRef}
            placeholder={`Message ${contact.name}...`}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            className="flex-grow resize-none"
            rows={1}
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
