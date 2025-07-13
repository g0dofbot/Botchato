
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlusIcon } from '@/components/icons/UserPlusIcon';
import Link from 'next/link';

export default function JoinPage() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    console.log('Account creation successful. Redirecting...');
    router.push('/chat');
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-transparent border-primary/30 shadow-none">
        <CardHeader className="pt-6 pb-4">
          <CardTitle className="text-center font-normal tracking-[0.3em] text-lg text-primary">CREATE ACCOUNT</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <form onSubmit={handleJoin} className="space-y-6">
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
            <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="confirmPassword" className="text-sm tracking-widest">CONFIRM PASSWORD</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="bg-input border-primary/30 text-primary h-9"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <div className='flex flex-col items-center gap-4 pt-4'>
              <Button type="submit" variant="ghost" size="sm" className="w-full text-primary hover:bg-primary/20 hover:text-primary tracking-widest p-0 justify-center h-auto">
                <UserPlusIcon className="w-4 h-4 mr-2" />
                CREATE ACCOUNT
              </Button>
              <Link href="/" className="text-primary/50 hover:text-primary text-sm">
                &lt; BACK TO LOGIN &gt;
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
