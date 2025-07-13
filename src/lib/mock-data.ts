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
  // New fields for the info panel
  officerId: string;
  securityCode: string;
  weapon: string;
  bio: string;
}

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Player 2',
    avatar: 'https://placehold.co/96x96.png',
    status: 'online',
    officerId: 'P2-ARCADE',
    securityCode: '48532695-CF',
    weapon: 'JOYSTICK',
    bio: 'SUBJECT IS A LONG-TIME ASSOCIATE. KNOWN SKILL IN ARCADE-STYLE COMBAT SIMULATIONS. FREQUENTLY USES عبارات مثل "1-UP" AND "GAME OVER". CONSIDERED A RELIABLE ASSET.',
    messages: [
      { id: 1, text: "PLAYER 2: Hey, are you ready for the next level?", sender: 'contact', timestamp: "10:00 AM" },
      { id: 2, text: "YOU: You bet! Just grabbing a 1-UP.", sender: 'me', timestamp: "10:01 AM" },
      { id: 3, text: "PLAYER 2: Haha, classic. Meet me at the castle.", sender: 'contact', timestamp: "10:02 AM" },
    ],
  },
  {
    id: '2',
    name: 'Princess Peach',
    avatar: 'https://placehold.co/96x96.png',
    status: 'online',
    officerId: 'MUSH-KING-01',
    securityCode: 'PEACH-1985-ND',
    weapon: 'PARASOL',
    bio: 'HIGH-VALUE PRINCIPAL. RECURRING VICTIM OF KIDNAPPING BY REGIONAL WARLORD "BOWSER". POSSESSES UNVERIFIED FLOATING ABILITIES. ALL-AROUND PERSONABLE.',
    messages: [
      { id: 1, text: "PRINCESS PEACH: Thanks for saving me again!", sender: 'contact', timestamp: "11:30 AM" },
      { id: 2, text: "YOU: No problem, your highness. Just doing my job!", sender: 'me', timestamp: "11:31 AM" },
    ],
  },
  {
    id: '3',
    name: 'Toad',
    avatar: 'https://placehold.co/96x96.png',
    status: 'offline',
    officerId: 'CIV-TOAD-03',
    securityCode: '84591238-MK',
    weapon: 'MUSHROOM',
    bio: 'CIVILIAN ASSET. ROYAL ATTENDANT TO PRINCESS PEACH. KNOWN FOR HIGH-PITCHED VOCALIZATIONS AND PROVIDING MISLEADING INTELLIGENCE. RELIABILITY IS QUESTIONABLE BUT INTENTIONS SEEM BENIGN.',
    messages: [
      { id: 1, text: "TOAD: The princess is in another castle!", sender: 'contact', timestamp: "Yesterday" },
      { id: 2, text: "YOU: AGAIN?! Which one this time?", sender: 'me', timestamp: "Yesterday" },
      { id: 3, text: "TOAD: Umm... I think the one past the spooky forest.", sender: 'contact', timestamp: "Yesterday" },
      { id: 4, text: "YOU: On my way.", sender: 'me', timestamp: "Yesterday" },
    ],
  },
  {
    id: '4',
    name: 'Bowser',
    avatar: 'https://placehold.co/96x96.png',
    status: 'offline',
    officerId: 'HOSTILE-01',
    securityCode: 'KOOPA-KING-XX',
    weapon: 'FIRE BREATH',
    bio: 'PRIMARY ANTAGONIST. LEADER OF THE KOOPA TROOP. REPEATEDLY ATTEMPTS TO ANNEX THE MUSHROOM KINGDOM. MOTIVATIONS APPEAR TO BE TERRITORIAL AND POSSIBLY ROMANTIC. EXTREME CAUTION ADVISED.',
    messages: [
        {id: 1, text: "BOWSER: You'll never defeat me, plumber!", sender: 'contact', timestamp: "Last week"},
        {id: 2, text: "YOU: We'll see about that, shell-for-brains.", sender: 'me', timestamp: "Last week"},
    ]
  }
];
