'use client';

import type { Contact } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { UserIcon } from '@/components/icons/UserIcon';
import { UserPlusIcon } from '@/components/icons/UserPlusIcon';
import { SettingsIcon } from '@/components/icons/SettingsIcon';
import { UsersIcon } from '@/components/icons/UsersIcon';


interface ContactListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

export function ContactList({ contacts, selectedContact, onSelectContact }: ContactListProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UsersIcon />
            Contacts
          </div>
          <TooltipProvider>
            <div className="flex items-center gap-1">
               <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserPlusIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add Friend</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <SettingsIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-0 flex-grow">
        <ScrollArea className="h-[calc(80vh-120px)]">
          <ul className="p-2 space-y-1">
            {contacts.map((contact) => (
              <li
                key={contact.id}
                onClick={() => onSelectContact(contact)}
                className={cn(
                  "p-3 rounded-md cursor-pointer transition-colors flex items-center gap-4",
                  selectedContact?.id === contact.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                <UserIcon />
                <span>{contact.name}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
