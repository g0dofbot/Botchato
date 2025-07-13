import type { StaticImageData } from 'next/image';

export interface RetroEmoji {
  name: string;
  path: string | StaticImageData;
}

// Ensure your PNG files are in the `public/emojis/` directory for these paths to work.
export const retroEmojis: RetroEmoji[] = [
  { name: 'blushed', path: '/emojis/13749-blushed.png' },
  { name: 'exhausted', path: '/emojis/23085-exhausted.png' },
  { name: 'nerd', path: '/emojis/6386-nerd.png' },
  { name: 'smile', path: '/emojis/37211-smile.png' },
  { name: 'tease', path: '/emojis/58590-tease.png' },
  { name: 'wtf', path: '/emojis/52091-wtf.png' },
  { name: 'sunglasses', path: '/emojis/28714-sunglasses.png' },
  { name: 'upside-smile', path: '/emojis/10450-upside-smile.png' },
  { name: 'blush', path: '/emojis/37211-blush.png' },
  { name: 'kissing-heart', path: '/emojis/kissing-heart.png' },
  { name: 'npc', path: '/emojis/npc.png' },
  { name: 'smirk', path: '/emojis/smirk.png' },
];
