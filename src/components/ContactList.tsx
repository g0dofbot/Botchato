
'use client';

import type { Contact } from '@/lib/mock-data';
import Image from 'next/image';

interface ContactInfoProps {
  contact: Contact | null;
}

export function ContactInfo({ contact }: ContactInfoProps) {
  if (!contact) {
    return (
      <div className="nes-container is-dark is-centered h-full">
        <p>Select a friend to see their info.</p>
      </div>
    );
  }

  return (
    <div className="nes-container with-title is-dark h-full">
        <p className="title">{contact.name}'s Info</p>
        <div className="pt-4 text-center">
            <Image
                src={contact.avatar}
                alt={`Avatar of ${contact.name}`}
                width={96}
                height={96}
                className="mx-auto"
                style={{ imageRendering: 'pixelated' }}
                data-ai-hint="cute avatar"
            />
            <p className="mt-4 text-lg">{contact.name}</p>
            <p className="nes-text is-disabled">@{contact.username}</p>
            <div className='mt-2'>
              <a href="#"><i className="nes-icon twitter is-small"></i></a>
              <a href="#"><i className="nes-icon facebook is-small"></i></a>
              <a href="#"><i className="nes-icon instagram is-small"></i></a>
              <a href="#"><i className="nes-icon github is-small"></i></a>
              <a href="#"><i className="nes-icon gmail is-small"></i></a>
            </div>
        </div>

        <div className="mt-6 text-sm">
            <div className="nes-container is-dark with-title">
                <p className="title">Bio</p>
                <p className="text-xs">{contact.bio}</p>
            </div>
             <div className="nes-container is-dark with-title mt-4">
                <p className="title">Fav Food</p>
                <p className="text-xs">{contact.favoriteFood}</p>
            </div>
        </div>
    </div>
  );
}
