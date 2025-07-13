'use client';

import React, { useState, useRef, useEffect } from 'react';
import type { Contact } from '@/lib/mock-data';
import { playMessageSentSound } from '@/lib/sounds';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { SendIcon } from '@/components/icons/SendIcon';
import { SmileIcon } from '@/components/icons/SmileIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { EmojiHappyIcon } from '@/components/icons/EmojiHappyIcon';
import { EmojiSadIcon } from '@/components/icons/EmojiSadIcon';
import { EmojiWinkIcon } from '@/components/icons/EmojiWinkIcon';

interface ChatWindowProps {
  contact: Contact | null;
  onSendMessage: (message: string) => void;
}

const emojis = [
  { char: ':)', component: EmojiHappyIcon, name: 'Happy' },
  { char: ':(', component: EmojiSadIcon, name: 'Sad' },
  { char: ';)', component: EmojiWinkIcon, name: 'Wink' },
];


export function ChatWindow({ contact, onSendMessage }: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollArea = scrollAreaRef.current.querySelector('div');
        if (scrollArea) {
            scrollArea.scrollTop = scrollArea.scrollHeight;
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
  
  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji + ' ');
  }

  if (!contact) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent>
          <p>Select a contact to start chatting.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-[80vh] flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">{contact.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
        <ScrollArea className="flex-grow p-4 rounded-md bg-background" ref={scrollAreaRef}>
          <div className="space-y-8">
            {contact.messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-start gap-4 max-w-lg",
                  msg.sender === 'me' ? 'justify-end ml-auto' : 'justify-start mr-auto'
                )}
              >
                {msg.sender === 'contact' && <UserIcon className="w-12 h-12 flex-shrink-0" />}
                 <div
                  className={cn(
                    'nes-balloon',
                    msg.sender === 'me'
                      ? 'from-right'
                      : 'from-left'
                  )}
                >
                  <p className="break-words">{msg.text}</p>
                </div>
                {msg.sender === 'me' && <UserIcon className="w-12 h-12 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button type="button" variant="ghost" size="icon">
                <SmileIcon />
                <span className="sr-only">Open emoji picker</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="grid grid-cols-4 gap-2 text-lg font-body">
                {emojis.map(emoji => (
                  <button
                    key={emoji.name}
                    type="button"
                    title={emoji.name}
                    onClick={() => handleEmojiSelect(emoji.char)}
                    className="rounded-md p-2 hover:bg-muted transition-colors"
                  >
                    <emoji.component className="w-6 h-6" />
                    <span className="sr-only">{emoji.name}</span>
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          <Input
            type="text"
            id="message_field"
            placeholder="> "
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            autoComplete="off"
            className="flex-grow"
          />
          <Button type="submit" size="icon" variant="secondary">
            <SendIcon />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
