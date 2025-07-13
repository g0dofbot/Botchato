
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const asciiArt = `
    ,o.          .o,
  ,o88.        .88o,
,o8888.      .8888o,
  '88888888888888'
    '8888888888'
      '888888'
      .888888.
    .88888888.
  .8888888888.
8888888888888888
'88888888888888'
  '8888888888'
    'V8888V'
      'V''V'
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
      setError('ALL FIELDS ARE REQUIRED FOR REGISTRATION.');
      return;
    }
    // In a real app, you'd create the user here.
    // For now, we'll just redirect to login.
    setError('');
    console.log('Registration successful. Redirecting to login...');
    router.push('/');
  };

  return (
    <main className="p-2 md:p-4 min-h-screen flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl">
        <div className="text-primary hidden md:block">
          <pre className="text-center text-xs leading-tight">
            {asciiArt}
          </pre>
          <p className="text-center mt-4 font-headline">BALTIMORE POLICE DEPARTMENT</p>
        </div>
        <Card className="w-full max-w-md terminal-container">
          <CardHeader>
            <CardTitle className="text-3xl">ENLISTMENT</CardTitle>
            <CardDescription>CREATE YOUR BPD ACCOUNT</CardDescription>
          </CardHeader>
          <form onSubmit={handleJoin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="officerId">OFFICER ID:</Label>
                <Input 
                  id="officerId" 
                  type="text" 
                  placeholder="ASSIGNED IDENTIFIER..." 
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  className="bg-black/50 border-primary rounded-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="callsign">CALLSIGN:</Label>
                <Input 
                  id="callsign" 
                  type="text" 
                  placeholder="OPERATIONAL NAME..." 
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value)}
                  className="bg-black/50 border-primary rounded-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">PASSWORD:</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="ACCESS CODE..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-black/50 border-primary rounded-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
                />
              </div>
              {error && <p className="text-destructive text-center pt-2">{error}</p>}
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-4">
              <Button type="submit" className="w-full bg-black/50 border-primary rounded-none h-full px-8 text-lg hover:bg-primary/20">
                [ SUBMIT APPLICATION ]
              </Button>
               <Link href="/" className="text-center text-sm text-muted-foreground hover:text-primary transition-colors">
                  &lt; RETURN TO LOGIN TERMINAL &gt;
                </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
