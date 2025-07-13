
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const asciiArt = `
      *****************
   ***********************
 ***************************
*****************************
*****************************
*****************************
 ***************************
   ***********************
      *****************
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
    // In a real app, you'd create the user here.
    // For now, we'll just redirect to login.
    setError('');
    console.log('Registration successful. Redirecting to login...');
    router.push('/');
  };

  return (
    <main className="p-4 min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl">
        <div className="text-primary hidden md:block text-center">
          <pre className="text-orange-400 text-xs leading-tight opacity-70">
{`
          .--.
         |o_o |
         |:_/ |
        //   \\ \\
       (|     | )
      /'\\_   _/'\\
      \\___)=(___/
`}
          </pre>
          <p className="text-center mt-4 font-bold text-lg text-slate-700">Join the Fun!</p>
          <p className="text-center text-sm text-slate-500">Create an account to start chatting with friends.</p>
        </div>
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Create an Account</CardTitle>
            <CardDescription>It's quick and easy!</CardDescription>
          </CardHeader>
          <form onSubmit={handleJoin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="officerId">Your Name</Label>
                <Input 
                  id="officerId" 
                  type="text" 
                  placeholder="e.g. Alex" 
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                />
              </div>
               <div className="space-y-2">
                <Label htmlFor="callsign">Username</Label>
                <Input 
                  id="callsign" 
                  type="text" 
                  placeholder="e.g. alex_plays" 
                  value={callsign}
                  onChange={(e) => setCallsign(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-destructive text-sm text-center pt-2">{error}</p>}
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-3">
              <Button type="submit" className="w-full" size="lg">
                Sign Up
              </Button>
               <Link href="/" className="text-center text-sm text-muted-foreground hover:text-primary transition-colors">
                  Already have an account? Sign In
                </Link>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
