
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { VT323 } from 'next/font/google';

const vt323 = VT323({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-vt323',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Botrochat',
  description: 'An encrypted, retro terminal-style messaging app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${vt323.variable}`}>
      <head>
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
