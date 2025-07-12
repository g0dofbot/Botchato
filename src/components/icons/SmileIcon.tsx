import React from 'react';
import { PixelatedIcon } from './PixelatedIcon';

export const SmileIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <PixelatedIcon path="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4-6h8v2H8v-2zm2-4h4v2h-4v-2z" {...props} />
);
