
import React from 'react';
import { PixelatedIcon } from './PixelatedIcon';

export const UserPlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <PixelatedIcon path="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h9v-2c0-.71.34-1.34.88-1.76A4.015 4.015 0 0 1 12 14c.18 0 .36.02.53.05.77.16 1.47.53 2.09.95H20v-2c0-2.66-5.33-4-8-4zm4 4v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2z" {...props} />
);
