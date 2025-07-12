export interface Message {
  id: number;
  text: string;
  sender: 'me' | 'contact';
  timestamp: string;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string; // Not used in the new UI, but kept for data structure consistency
  messages: Message[];
}

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Player 2',
    avatar: 'p2-avatar',
    messages: [
      { id: 1, text: "Hey, are you ready for the next level?", sender: 'contact', timestamp: "10:00 AM" },
      { id: 2, text: "You bet! Just grabbing a 1-UP.", sender: 'me', timestamp: "10:01 AM" },
      { id: 3, text: "Haha, classic. Meet me at the castle.", sender: 'contact', timestamp: "10:02 AM" },
    ],
  },
  {
    id: '2',
    name: 'Princess Peach',
    avatar: 'peach-avatar',
    messages: [
      { id: 1, text: "Thanks for saving me again!", sender: 'contact', timestamp: "11:30 AM" },
      { id: 2, text: "No problem, your highness. Just doing my job!", sender: 'me', timestamp: "11:31 AM" },
    ],
  },
  {
    id: '3',
    name: 'Toad',
    avatar: 'toad-avatar',
    messages: [
      { id: 1, text: "The princess is in another castle!", sender: 'contact', timestamp: "Yesterday" },
      { id: 2, text: "AGAIN?! Which one this time?", sender: 'me', timestamp: "Yesterday" },
      { id: 3, text: "Umm... I think the one past the spooky forest.", sender: 'contact', timestamp: "Yesterday" },
      { id: 4, text: "On my way.", sender: 'me', timestamp: "Yesterday" },
    ],
  },
  {
    id: '4',
    name: 'Bowser',
    avatar: 'bowser-avatar',
    messages: [
        {id: 1, text: "You'll never defeat me, plumber!", sender: 'contact', timestamp: "Last week"},
        {id: 2, text: "We'll see about that, shell-for-brains.", sender: 'me', timestamp: "Last week"},
    ]
  }
];
