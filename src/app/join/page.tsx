
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlusIcon } from '@/components/icons/UserPlusIcon';

const asciiArt = `
██████╗░██╗░░░██╗██████╗░██╗██████╗░███████╗
██╔══██╗██║░░░██║██╔══██╗██║██╔══██╗██╔════╝
██████╔╝██║░░░██║██║░░██║██║██████╔╝█████╗░░
██╔═══╝░██║░░░██║██║░░██║██║██╔══██╗██╔══╝░░
██║░░░░░╚██████╔╝██████╔╝██║██║░░██║███████╗
╚═╝░░░░░░╚═════╝░╚═════╝░╚═╝╚═╝░░╚═╝╚══════╝
`;

export default function JoinPage() {
  const [officerId, setOfficerId] = useState('');
  const [callsign, setCallsign] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerId || !callsign || !password) {
      setError('All fields are required.');
      return;
    }
    setError('');
    console.log('Registration successful. Redirecting to login...');
    router.push('/');
  };

  return (
    <main className="p-4 min-h-screen flex flex-col items-center justify-center">
       <div className="text-center mb-8">
          <pre className="text-xs leading-tight text-primary">
{asciiArt}
          </pre>
        </div>
      <Card className="w-full max-w-md bg-background/50 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <UserPlusIcon className="w-6 h-6" />
            ENLISTMENT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleJoin}>
            <div className="space-y-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="officerId">OFFICER ID</Label>
                <Input
                  id="officerId"
                  type="text"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  className="bg-input border-primary/30 text-primary"
                  placeholder="e.g. 7482"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="callsign">CALLSIGN</Label>
                <Input
                  id="callsign"
                  type="text"
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value)}
                  className="bg-input border-primary/30 text-primary"
                  placeholder="e.g. DELTA-7"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password">PASSWORD</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-input border-primary/30 text-primary"
                  placeholder="••••••••"
                />
              </div>
            </div>
            {error && <p className="text-destructive text-sm mt-4">{error}</p>}
            <div className='flex flex-col items-center gap-4 mt-6'>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
                SUBMIT APPLICATION
              </Button>
              <Link href="/" className="text-primary/50 hover:text-primary text-sm">
                &lt; RETURN TO LOGIN &gt;
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
