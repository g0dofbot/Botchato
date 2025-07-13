
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const asciiArt = `
    _   _   _   _   _   _   _   _
   / \\ / \\ / \\ / \\ / \\ / \\ / \\ / \\
  ( R | E | T | R | O | M | S | G )
   \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/ \\_/
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
          <pre className="text-sm leading-tight text-yellow-300">
{asciiArt}
          </pre>
        </div>
      <div className="nes-container with-title is-dark w-full max-w-md">
        <p className="title">New Player</p>
        <p>Create your player profile.</p>
        <form onSubmit={handleJoin}>
          <div className="nes-field mt-4">
            <label htmlFor="officerId">Your Name</label>
            <input
              id="officerId"
              type="text"
              className="nes-input"
              value={officerId}
              onChange={(e) => setOfficerId(e.target.value)}
            />
          </div>
          <div className="nes-field mt-4">
            <label htmlFor="callsign">Username</label>
            <input
              id="callsign"
              type="text"
              className="nes-input"
              value={callsign}
              onChange={(e) => setCallsign(e.target.value)}
            />
          </div>
          <div className="nes-field mt-4">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="nes-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="nes-text is-error text-sm mt-4">{error}</p>}
          <div className='flex flex-col items-center gap-4 mt-6'>
            <button type="submit" className="nes-btn is-success w-full">
              Create Account
            </button>
            <Link href="/" className="nes-text">
              Already a player? Sign In
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
