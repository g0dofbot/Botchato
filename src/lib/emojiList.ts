
import React from 'react';
import { EmojiHappyIcon } from '@/components/icons/EmojiHappyIcon';
import { EmojiSadIcon } from '@/components/icons/EmojiSadIcon';
import { EmojiWinkIcon } from '@/components/icons/EmojiWinkIcon';
import { EmojiBlushIcon } from '@/components/icons/EmojiBlushIcon';
import { EmojiNerdIcon } from '@/components/icons/EmojiNerdIcon';
import { EmojiSunglassesIcon } from '@/components/icons/EmojiSunglassesIcon';

export interface RetroEmoji {
  name: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export const retroEmojis: RetroEmoji[] = [
  { name: 'smile', Icon: EmojiHappyIcon },
  { name: 'sad', Icon: EmojiSadIcon },
  { name: 'wink', Icon: EmojiWinkIcon },
  { name: 'blush', Icon: EmojiBlushIcon },
  { name: 'nerd', Icon: EmojiNerdIcon },
  { name: 'sunglasses', Icon: EmojiSunglassesIcon },
];
