
'use client';

import React from 'react';
import { retroEmojis } from '@/lib/emojiList';
import { decrypt } from '@/lib/cipher';

interface MessageRendererProps {
  text: string;
}

const emojiMap = new Map(retroEmojis.map(emoji => [emoji.name.toLowerCase(), emoji.Icon]));

// This regex finds both the sender prefix (e.g., "YOU: ") and the emoji codes.
const messagePartsRegex = /^(.*?:\s)?(.*)$/;
const emojiRegex = /:([a-zA-Z0-9_-]+):/g;

export function MessageRenderer({ text }: MessageRendererProps) {
  // First, decrypt the entire raw string
  const decryptedText = decrypt(text);

  // Separate the sender prefix (if it exists) from the content
  const match = decryptedText.match(messagePartsRegex);
  const senderPrefix = match?.[1] || '';
  const messageContent = match?.[2] || '';
  
  // Now, split the content part by emoji codes
  const parts = messageContent.split(emojiRegex);

  return (
    <>
      {/* Render the sender prefix as-is */}
      {senderPrefix}
      {/* Render the message content with emojis */}
      {parts.map((part, index) => {
        if (index % 2 === 0) {
          // Even-indexed parts are regular text
          return <span key={index}>{part}</span>;
        }

        // Odd-indexed parts are emoji names
        const EmojiIcon = emojiMap.get(part.toLowerCase());
        if (EmojiIcon) {
          return (
             <EmojiIcon
              key={index}
              className="inline-block mx-1 align-text-bottom w-4 h-4"
            />
          );
        }

        // If no emoji is found, render the original text (e.g., ":unknown:")
        return <span key={index}>{`:${part}:`}</span>;
      })}
    </>
  );
}
