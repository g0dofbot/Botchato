
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    <main className="p-4 min-h-screen flex items-center justify-center">
      <div className="nes-container with-title is-dark max-w-md w-full">
        <p className="title text-2xl">Retro Messenger</p>
        <p className="mb-4">Please sign in.</p>
        <form onSubmit={handleLogin}>
          <div className="nes-field mb-4">
            <label htmlFor="userId">User ID</label>
            <input
              id="userId"
              type="text"
              className="nes-input"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="nes-field mb-6">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="nes-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="nes-text is-error mb-4 text-sm">{error}</p>}
          <div className='flex flex-col items-center gap-4'>
            <button type="submit" className="nes-btn is-primary w-full">
              Sign In
            </button>
            <Link href="/join" className="nes-text">
              New player? Start here.
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
