
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioTowerIcon } from '@/components/icons/RadioTowerIcon';

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
    <main className="p-4 min-h-screen flex items-center justify-center">
      <Card className="max-w-md w-full bg-background/50 border-primary/30">
        <CardHeader>
          <CardTitle className="text-primary text-center text-xl">
            BPD SECURE MESSAGING
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="userId">USER ID</Label>
              <Input
                id="userId"
                type="text"
                className="bg-input border-primary/30 text-primary"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">PASSWORD</Label>
              <Input
                id="password"
                type="password"
                className="bg-input border-primary/30 text-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className='flex flex-col items-center gap-4 pt-4'>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/80">
                <RadioTowerIcon className="w-5 h-5 mr-2" />
                CONNECT
              </Button>
              <Link href="/join" className="text-primary/50 hover:text-primary text-sm">
                 NO ACCOUNT? ENLIST HERE
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
