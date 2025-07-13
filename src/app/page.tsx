
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !password) {
      setError('USER ID AND PASSWORD REQUIRED.');
      return;
    }
    // For now, any input is valid.
    setError('');
    console.log('Authentication successful. Redirecting...');
    router.push('/chat');
  };

  return (
    <main className="p-2 md:p-4 min-h-screen flex flex-col items-center justify-center">
      <Card className="w-full max-w-md terminal-container">
        <CardHeader>
          <CardTitle className="text-3xl">BPD SECURE MESSAGING</CardTitle>
          <CardDescription>TERMINAL ACCESS</CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">USER ID:</Label>
              <Input 
                id="userId" 
                type="text" 
                placeholder="ENTER USER ID..." 
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="bg-black/50 border-primary rounded-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">PASSWORD:</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="ENTER PASSWORD..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/50 border-primary rounded-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0"
              />
            </div>
            {error && <p className="text-destructive text-center pt-2">{error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-black/50 border-primary rounded-none h-full px-8 text-lg hover:bg-primary/20">
              [ AUTHENTICATE ]
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
