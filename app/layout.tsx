import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Geist, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { HeaderStyleProvider } from '@/contexts/HeaderStyleContext';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-ibm-plex-mono',
  display: 'swap',
});

const geometric = localFont({
  src: [
    {
      path: '/fonts/geometric-regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-geometric',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Studio Minsky',
  description: 'Web development studio based in Vienna, Austria.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <HeaderStyleProvider>
        <body
          className={`${geist.variable} ${ibmPlexMono.variable} ${geometric.variable} antialiased`}
        >
          {children}
        </body>
      </HeaderStyleProvider>
    </html>
  );
}
