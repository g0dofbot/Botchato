
'use client';

import type { Contact } from '@/lib/mock-data';
import Image from 'next/image';
import { UserIcon } from './icons/UserIcon';

interface ContactInfoProps {
  contact: Contact | null;
}

export function ContactInfo({ contact }: ContactInfoProps) {
  if (!contact) {
    return (
      <div className="border border-primary/30 h-full flex items-center justify-center bg-background/20 p-4">
        <p className="text-primary text-center">Select contact to view file.</p>
      </div>
    );
  }

  return (
    <div className="border border-primary/30 h-full p-4 bg-background/20">
        <h2 className="text-lg font-bold mb-4 text-primary flex items-center gap-2">
          <UserIcon className="w-5 h-5" />
          FILE: {contact.name.toUpperCase()}
        </h2>
        <div className="text-center">
            <Image
                src={contact.avatar}
                alt={`Avatar of ${contact.name}`}
                width={96}
                height={96}
                className="mx-auto border-2 border-primary/50"
                style={{ imageRendering: 'pixelated' }}
                data-ai-hint="pixelated avatar"
            />
        </div>

        <div className="mt-6 text-sm space-y-4">
            <div>
              <p className="text-primary/70">STATUS</p>
              <p className={`text-primary font-bold ${contact.status === 'online' ? 'animate-pulse' : ''}`}>{contact.status.toUpperCase()}</p>
            </div>
             <div>
              <p className="text-primary/70">CALLSIGN</p>
              <p className="text-primary">{contact.username}</p>
            </div>
             <div>
              <p className="text-primary/70">KNOWN ASSOCIATES</p>
              <p className="text-primary">{contact.associates}</p>
            </div>
            <div>
              <p className="text-primary/70">BIO</p>
              <p className="text-primary whitespace-pre-wrap">{contact.bio}</p>
            </div>
        </div>
    </div>
  );
}
