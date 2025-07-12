'use client';

import type { Contact } from '@/lib/mock-data';

interface ContactListProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

export function ContactList({ contacts, selectedContact, onSelectContact }: ContactListProps) {
  return (
    <div className="nes-container is-dark with-title h-full">
      <p className="title">Contacts</p>
      <div className="lists">
        <ul className="nes-list is-circle">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              onClick={() => onSelectContact(contact)}
              className="cursor-pointer"
              style={{
                backgroundColor: selectedContact?.id === contact.id ? 'var(--accent-color, #FFFF80)' : 'transparent',
                color: selectedContact?.id === contact.id ? 'var(--accent-fg-color, #191970)' : 'white',
                padding: '0.5rem',
                marginBottom: '0.25rem',
              }}
            >
              <div className="flex items-center gap-4">
                <i className={`nes-avatar is-medium ${contact.avatar}`}></i>
                <span>{contact.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
