'use client';

import type { Contact } from '@/lib/mock-data';
import Image from 'next/image';

interface ContactInfoProps {
  contact: Contact | null;
}

export function ContactInfo({ contact }: ContactInfoProps) {
  if (!contact) {
    return (
      <div className="h-full flex items-center justify-center terminal-panel">
        <p>AWAITING SUBJECT IDENTIFICATION...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-2 text-lg">
      <div className="terminal-panel p-2 flex gap-4">
        <div className="w-24 h-24 border border-primary p-1 bg-black">
           <Image
            src={contact.avatar}
            alt={`Mugshot of ${contact.name}`}
            width={96}
            height={96}
            className="w-full h-full object-cover"
            data-ai-hint="pixelated portrait"
          />
        </div>
        <div className="space-y-1">
          <p>OFFICER: {contact.officerId}</p>
          <p>LEGAL NAME: {contact.name.toUpperCase()}</p>
          <p>SECURITY CODE: {contact.securityCode}</p>
          <p>PERSONAL WEAPON: {contact.weapon}</p>
        </div>
      </div>
      <div className="terminal-panel p-2 flex-grow">
        <p>{contact.bio}</p>
      </div>
    </div>
  );
}
