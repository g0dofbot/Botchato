
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioTowerIcon } from '@/components/icons/RadioTowerIcon';
import { TimeBasedAsciiArt } from '@/components/TimeBasedAsciiArt';
import { UserPlusIcon } from '@/components/icons/UserPlusIcon';
import Link from 'next/link';

export default function LoginPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !password) {
      setError('ID and Password required.');
      return;
    }
    setError('');
    console.log('Authentication successful. Redirecting...');
    router.push('/chat');
  };

  return (
    <>
      <TimeBasedAsciiArt className="fixed inset-0 z-0 opacity-10 text-primary pointer-events-none flex items-center justify-center text-6xl xl:text-8xl" />
      <main className="min-h-screen flex items-center justify-center p-0 relative z-10">
        <Card className="max-w-md w-full bg-transparent border-primary/30 shadow-none">
          <CardHeader className="pt-6 pb-4">
             <CardTitle className="text-center font-normal tracking-[0.3em] text-lg text-primary">BOTROCHAT</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="userId" className="text-sm tracking-widest">USER ID</Label>
                <Input
                  id="userId"
                  type="text"
                  className="bg-input border-primary/30 text-primary h-9"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="password" className="text-sm tracking-widest">PASSWORD</Label>
                <Input
                  id="password"
                  type="password"
                  className="bg-input border-primary/30 text-primary h-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-destructive text-sm">{error}</p>}
              <div className='flex flex-col items-center gap-4 pt-4'>
                <Button type="submit" variant="ghost" size="sm" className="w-full text-primary hover:bg-primary/20 hover:text-primary tracking-widest p-0 justify-center h-auto">
                  <RadioTowerIcon className="w-4 h-4 mr-2" />
                  CONNECT
                </Button>
                <Link href="/join" className="text-primary/50 hover:text-primary text-sm flex items-center gap-2">
                  <UserPlusIcon className="w-4 h-4" />
                  CREATE ACCOUNT
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
