
'use client';

import type { Contact } from '@/lib/mock-data';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface ContactInfoProps {
  contact: Contact | null;
}

export function ContactInfo({ contact }: ContactInfoProps) {
  if (!contact) {
    return (
      <Card className="h-full">
        <CardContent className="h-full flex items-center justify-center text-muted-foreground">
          <p>Select a friend to see their info.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
        <CardHeader className="items-center text-center">
            <div className="relative">
                <Image
                    src={contact.avatar}
                    alt={`Avatar of ${contact.name}`}
                    width={96}
                    height={96}
                    className="rounded-full border-4 border-white shadow-md"
                    data-ai-hint="cute avatar"
                />
                 <span className={cn(
                    "absolute bottom-1 right-1 block w-4 h-4 rounded-full border-2 border-white", 
                    contact.status === 'online' ? 'bg-green-500' : 'bg-slate-400'
                )}></span>
            </div>
            <CardTitle className="text-xl mt-2">{contact.name}</CardTitle>
            <p className="text-sm text-muted-foreground">@{contact.username}</p>
        </CardHeader>
        <CardContent className="text-sm text-center">
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold text-slate-800">About Me</h4>
                    <p className="text-muted-foreground">{contact.bio}</p>
                </div>
                 <div>
                    <h4 className="font-semibold text-slate-800">Favorite Food</h4>
                    <p className="text-muted-foreground">{contact.favoriteFood}</p>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
