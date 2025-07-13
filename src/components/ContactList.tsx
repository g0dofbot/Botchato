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
          <p>STATUS: <span className={contact.status === 'online' ? 'text-green-400' : 'text-yellow-400'}>{contact.status.toUpperCase()}</span></p>
        </div>
      </div>
      <div className="terminal-panel p-2 flex-grow">
        <p className="font-bold mb-2">BIO:</p>
        <p>{contact.bio}</p>
        <p className="mt-4 font-bold">WEAPON OF CHOICE:</p>
        <p>{contact.weapon}</p>
      </div>
    </div>
  );
}
