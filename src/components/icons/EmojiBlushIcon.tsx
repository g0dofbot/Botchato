
import React from 'react';
import { PixelatedIcon } from './PixelatedIcon';

export const EmojiBlushIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <PixelatedIcon path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM9 13h6v-2H9v2zm-2-2h2v2H7v-2zm10 0h2v2h-2v-2z" {...props} />
);
