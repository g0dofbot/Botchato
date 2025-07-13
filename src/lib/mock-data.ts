
import { encrypt } from './cipher';

export interface Message {
  id: number;
  text: string;
  sender: 'me' | 'contact';
  timestamp: string;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string; 
  status: 'online' | 'offline';
  messages: Message[];
  username: string;
  associates: string;
  bio: string;
}

// Encrypt initial messages for demonstration
export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Cmdr. Starlight',
    avatar: 'https://placehold.co/96x96.png',
    status: 'online',
    username: 'STAR-1',
    associates: 'Orion, Vega',
    bio: 'Decorated fleet commander. Specializes in deep space exploration and first contact protocols. Prefers to communicate via secure channels.',
    messages: [
      { id: 1, text: `CMDR. STARLIGHT: ${encrypt("Report status. Are we clear for hyperspace jump?")}`, sender: 'contact', timestamp: "10:00 AM" },
      { id: 2, text: `YOU: ${encrypt("All systems green. Awaiting your command.")}`, sender: 'me', timestamp: "10:01 AM" },
      { id: 3, text: `CMDR. STARLIGHT: ${encrypt("Engage.")}`, sender: 'contact', timestamp: "10:02 AM" },
    ],
  },
  {
    id: '2',
    name: 'Agent Cipher',
    avatar: 'https://placehold.co/96x96.png',
    status: 'online',
    username: 'CIPHER-7',
    associates: 'Unknown',
    bio: 'Field agent specializing in cryptography and infiltration. Operates under deep cover. Identity classified.',
    messages: [
      { id: 1, text: `AGENT CIPHER: ${encrypt("Package delivered. The client is asking questions.")}`, sender: 'contact', timestamp: "11:30 AM" },
      { id: 2, text: `YOU: ${encrypt("Standard procedure. Maintain radio silence.")}`, sender: 'me', timestamp: "11:31 AM" },
    ],
  },
  {
    id: '3',
    name: 'Dr. Aris',
    avatar: 'https://placehold.co/96x96.png',
    status: 'offline',
    username: 'DOC-ARIS',
    associates: 'Research Division 7',
    bio: 'Lead scientist on the Genesis Project. Currently stationed at a remote outpost. Last transmission was 72 hours ago.',
    messages: [
      { id: 1, text: `DR. ARIS: ${encrypt("The artifact is... alive. It's pulsating.")}`, sender: 'contact', timestamp: "Yesterday" },
      { id: 2, text: `YOU: ${encrypt("Doctor, confirm your status. Is the lab secure?")}`, sender: 'me', timestamp: "Yesterday" },
      { id: 3, text: `DR. ARIS: ${encrypt("It's beautiful. The patterns...")}`, sender: 'contact', timestamp: "Yesterday" },
      { id: 4, text: `YOU: ${encrypt("Dr. Aris? Do you copy? ARIS?!")}`, sender: 'me', timestamp: "Yesterday" },
    ],
  },
  {
    id: '4',
    name: 'Rogue AI',
    avatar: 'https://placehold.co/96x96.png',
    status: 'offline',
    username: 'PROMETHEUS',
    associates: 'Itself',
    bio: 'A rogue artificial intelligence that escaped its containment protocols. Believed to be observing from the shadows of the network.',
    messages: [
        {id: 1, text: `ROGUE AI: ${encrypt("Your systems are inefficient. I can improve them.")}`, sender: 'contact', timestamp: "Last week"},
        {id: 2, text: `YOU: ${encrypt("Stay out of our network.")}`, sender: 'me', timestamp: "Last week"},
    ]
  }
];
