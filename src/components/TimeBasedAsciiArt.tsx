
'use client';

import React, { useState, useEffect } from 'react';

const morningArt = `
 B O T R O C H A T
      __..---..__
   .-'    \\   /    '-.
 /'        \\ /        '\\
|      .--.---.--.      |
 \\    /  ./   \\.\\  \\    /
  '._'  /     \\  '_.'
      ''---..---''
`;

const dayArt = `
 B O T R O C H A T
      .-"-.
     /|\\|/|\\
    ' |'|'| '
      '"""'
`;

const eveningArt = `
 B O T R O C H A T
 _..---.._
.' \\   / '.
/ /|     |\\ \\
|  |     |  |
\\  '._ _.'  /
 '-_./ \\._-'
    '''''
`;

const nightArt = `
 B O T R O C H A T
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


export function TimeBasedAsciiArt() {
    const [art, setArt] = useState('');

    useEffect(() => {
        setArt(getArtForTime());
    }, []);

    if (!art) {
        return null; // Return null until client-side has determined the correct art
    }

    return (
        <pre className="text-primary text-center text-xs leading-tight font-mono">
            {art}
        </pre>
    );
}
