// In a real app, you would need to convert your PNG files to Base64 Data URIs
// and place them here. For now, we are using placeholders.
// You can use an online converter to change your PNGs to Data URIs.
import type { StaticImageData } from 'next/image';

export interface RetroEmoji {
  name: string;
  path: string | StaticImageData;
}

export const retroEmojis: RetroEmoji[] = [
    // Example: { name: 'blushed', path: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUg....' },
    { name: 'blushed', path: 'https://placehold.co/32x32.png' },
    { name: 'exhausted', path: 'https://placehold.co/32x32.png' },
    { name: 'nerd', path: 'https://placehold.co/32x32.png' },
    { name: 'smile', path: 'https://placehold.co/32x32.png' },
    { name: 'tease', path: 'https://placehold.co/32x32.png' },
    { name: 'wtf', path: 'https://placehold.co/32x32.png' },
    { name: 'sunglasses', path: 'https://placehold.co/32x32.png' },
    { name: 'upside-smile', path: 'https://placehold.co/32x32.png' },
    { name: 'blush', path: 'https://placehold.co/32x32.png' },
];
