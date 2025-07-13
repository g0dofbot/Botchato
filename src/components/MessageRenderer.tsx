
'use client';

import React from 'react';
import { retroEmojis } from '@/lib/emojiList';
import { decrypt } from '@/lib/cipher';

interface MessageRendererProps {
  text: string;
}

const emojiMap = new Map(retroEmojis.map(emoji => [emoji.name.toLowerCase(), emoji.Icon]));

export function MessageRenderer({ text }: MessageRendererProps) {
  const decryptedText = decrypt(text);
  // Regex to find :emoji_name: patterns
  const emojiRegex = /:([a-zA-Z0-9_-]+):/g;
  
  const parts = decryptedText.split(emojiRegex);

  return (
    <>
      {parts.map((part, index) => {
        // Even-indexed parts are regular text, odd-indexed are emoji names
        if (index % 2 === 0) {
          return <span key={index}>{part}</span>;
        }

        const EmojiIcon = emojiMap.get(part.toLowerCase());
        if (EmojiIcon) {
          return (
             <EmojiIcon
              key={index}
              className="inline-block mx-1 align-text-bottom w-4 h-4"
            />
          );
        }

        // If no emoji is found, render the original text
        return <span key={index}>{`:${part}:`}</span>;
      })}
    </>
  );
}
