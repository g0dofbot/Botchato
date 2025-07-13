
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
  // Updated fields for the info panel
  username: string;
  favoriteFood: string;
  bio: string;
}

// Encrypt initial messages for demonstration
export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Player 2',
    avatar: 'https://placehold.co/96x96.png',
    status: 'online',
    username: 'P2-ARCADE',
    favoriteFood: 'Pizza',
    bio: 'Loves playing arcade games and is always ready for the next challenge. Frequently uses phrases like "1-UP" and "Game Over". Considered a reliable friend.',
    messages: [
      { id: 1, text: `PLAYER 2: ${encrypt("Hey, are you ready for the next level?")}`, sender: 'contact', timestamp: "10:00 AM" },
      { id: 2, text: `YOU: ${encrypt("You bet! Just grabbing a 1-UP.")}`, sender: 'me', timestamp: "10:01 AM" },
      { id: 3, text: `PLAYER 2: ${encrypt("Haha, classic. Meet me at the castle.")}`, sender: 'contact', timestamp: "10:02 AM" },
    ],
  },
  {
    id: '2',
    name: 'Princess Peach',
    avatar: 'https://placehold.co/96x96.png',
    status: 'online',
    username: 'RoyalPeach',
    favoriteFood: 'Cake',
    bio: 'Ruler of the Mushroom Kingdom. Enjoys baking, gardening, and going on adventures. Always gracious and kind to her friends.',
    messages: [
      { id: 1, text: `PRINCESS PEACH: ${encrypt("Thank you for coming to my party!")}`, sender: 'contact', timestamp: "11:30 AM" },
      { id: 2, text: `YOU: ${encrypt("Of course! I wouldn't miss it for the world.")}`, sender: 'me', timestamp: "11:31 AM" },
    ],
  },
  {
    id: '3',
    name: 'Toad',
    avatar: 'https://placehold.co/96x96.png',
    status: 'offline',
    username: 'ToadExplorer',
    favoriteFood: 'Mushroom Soup',
    bio: 'A loyal attendant to the princess and a friendly citizen of the Mushroom Kingdom. He is brave but can be a bit of a worrier. Always trying his best!',
    messages: [
      { id: 1, text: `TOAD: ${encrypt("I found a secret treasure map!")}`, sender: 'contact', timestamp: "Yesterday" },
      { id: 2, text: `YOU: ${encrypt("Wow! Where does it lead?")}`, sender: 'me', timestamp: "Yesterday" },
      { id: 3, text: `TOAD: ${encrypt("Umm... I think to a spooky forest.")}`, sender: 'contact', timestamp: "Yesterday" },
      { id: 4, text: `YOU: ${encrypt("Let's go check it out!")}`, sender: 'me', timestamp: "Yesterday" },
    ],
  },
  {
    id: '4',
    name: 'Bowser',
    avatar: 'https://placehold.co/96x96.png',
    status: 'offline',
    username: 'KingKoopa',
    favoriteFood: 'Steak',
    bio: 'Leader of the Koopa Troop. He has a tough exterior but a soft spot for his kids. Likes rock music and planning big, elaborate schemes.',
    messages: [
        {id: 1, text: `BOWSER: ${encrypt("You'll never beat me at go-karting!")}`, sender: 'contact', timestamp: "Last week"},
        {id: 2, text: `YOU: ${encrypt("We'll see about that, shell-for-brains.")}`, sender: 'me', timestamp: "Last week"},
    ]
  }
];
