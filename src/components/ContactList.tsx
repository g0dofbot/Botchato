'use client';

import type { Contact } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

interface ContactListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

export function ContactList({ contacts, selectedContact, onSelectContact }: ContactListProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Contacts</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
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
              <User />
              <span>{contact.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
