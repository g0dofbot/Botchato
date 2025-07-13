
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, this would call a server action to clear the session
    console.log('Logging out...');
    router.push('/');
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full bg-transparent border-primary/30 shadow-none">
        <CardHeader className="pt-6 pb-4">
          <CardTitle className="text-center font-normal tracking-[0.3em] text-lg text-primary">SETTINGS</CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <div className="space-y-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="userId" className="text-sm tracking-widest">USER ID</Label>
              <Input
                id="userId"
                type="text"
                className="bg-input border-primary/30 text-primary h-9"
                defaultValue="CURRENT_USER" // This would be fetched from the session
                disabled
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="callsign" className="text-sm tracking-widest">CALLSIGN</Label>
              <Input
                id="callsign"
                type="text"
                className="bg-input border-primary/30 text-primary h-9"
                defaultValue="USER-1" // This would be fetched from the session
              />
            </div>
            
            <div className='flex flex-col items-center gap-4 pt-4'>
              <Button variant="ghost" size="sm" className="w-full text-primary hover:bg-primary/20 hover:text-primary tracking-widest">
                SAVE CHANGES
              </Button>
               <Button onClick={handleLogout} variant="ghost" size="sm" className="w-full text-destructive/80 hover:bg-destructive/20 hover:text-destructive tracking-widest">
                LOG OUT
              </Button>
              <Link href="/chat" className="text-primary/50 hover:text-primary text-sm">
                &lt; BACK TO CHAT &gt;
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
