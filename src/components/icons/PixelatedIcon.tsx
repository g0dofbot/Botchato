import React from 'react';
import { cn } from '@/lib/utils';

interface PixelatedIconProps extends React.SVGProps<SVGSVGElement> {
  path: string;
}

export const PixelatedIcon: React.FC<PixelatedIconProps> = ({ path, className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6", className)}
      style={{ imageRendering: 'pixelated' }}
      {...props}
    >
      <path d={path} />
    </svg>
  );
};
