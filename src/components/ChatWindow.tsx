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

interface ChatWindowProps {
  contact: Contact | null;
  onSendMessage: (message: string) => void;
}

const emojis = [':)', ':(', ':D', ':O', ';)', ':P', '<3', '^_^', 'o_O', 'T_T', '8)', 'B)'];

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
          <div className="space-y-6">
            {contact.messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-end gap-2",
                  msg.sender === 'me' ? 'justify-end' : 'justify-start'
                )}
              >
                {msg.sender === 'contact' && <UserIcon className="w-10 h-10" />}
                <div
                  className={cn(
                    "relative max-w-xs md:max-w-md lg:max-w-lg",
                  )}
                >
                  <div className="pixel-border">
                    <div className={cn(
                        "pixel-border-content p-3",
                         msg.sender === 'me' ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
                      )}
                    >
                      <p className="break-words">{msg.text}</p>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "absolute bottom-[-4px] w-4 h-4",
                      msg.sender === 'me' ? "right-4" : "left-4"
                    )}
                    style={{
                      background: 'hsl(var(--foreground))',
                      webkitMask: 'linear-gradient(315deg, transparent 0 3px, #fff 3px 100%) 0 0/100% 100% no-repeat',
                      mask: 'linear-gradient(315deg, transparent 0 3px, #fff 3px 100%) 0 0/100% 100% no-repeat'
                    }}
                  ></div>
                   <div
                    className={cn(
                      "absolute bottom-0 w-3 h-2",
                      msg.sender === 'me' ? "right-4 bg-secondary" : "left-4 bg-muted"
                    )}
                  ></div>
                </div>
                {msg.sender === 'me' && <UserIcon className="w-10 h-10" />}
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
                    key={emoji}
                    type="button"
                    onClick={() => handleEmojiSelect(emoji)}
                    className="rounded-md p-2 hover:bg-muted transition-colors"
                  >
                    {emoji}
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
