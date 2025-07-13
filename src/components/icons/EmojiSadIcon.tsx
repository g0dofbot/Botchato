import React from 'react';
import { PixelatedIcon } from './PixelatedIcon';

export const EmojiSadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <PixelatedIcon path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8 12h8v2H8v-2zm2-4h2v2h-2V8zm4 0h2v2h-2V8z" {...props} />
);
