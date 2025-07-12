import React from 'react';
import { PixelatedIcon } from './PixelatedIcon';

export const SendIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <PixelatedIcon path="M4 20v-6l8-2-8-2V4l16 8-16 8z" {...props} />
);
