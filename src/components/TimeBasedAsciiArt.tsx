
'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const morningArt = `
      __..---..__
   .-'    \\   /    '-.
 /'        \\ /        '\\
|      .--.---.--.      |
 \\    /  ./   \\.\\  \\    /
  '._'  /     \\  '_.'
      ''---..---''
`;

const dayArt = `
      .-"-.
     /|\\|/|\\
    ' |'|'| '
      '"""'
`;

const eveningArt = `
 _..---.._
.' \\   / '.
/ /|     |\\ \\
|  |     |  |
\\  '._ _.'  /
 '-_./ \\._-'
    '''''
`;

const nightArt = `
      .--.
     /..  \\
    |:.   |
    |:.   |
     \\..  /
      '--'
`;

const getArtForTime = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) { // Morning 5am-12pm
        return morningArt;
    }
    if (hour >= 12 && hour < 17) { // Day 12pm-5pm
        return dayArt;
    }
    if (hour >= 17 && hour < 21) { // Evening 5pm-9pm
        return eveningArt;
    }
    // Night 9pm-5am
    return nightArt;
}


export function TimeBasedAsciiArt({ className }: { className?: string }) {
    const [art, setArt] = useState('');

    useEffect(() => {
        setArt(getArtForTime());
    }, []);

    if (!art) {
        return null; // Return null until client-side has determined the correct art
    }

    return (
        <pre className={cn("text-center leading-tight font-mono", className)}>
            {art}
        </pre>
    );
}
