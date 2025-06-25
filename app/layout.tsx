import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Geist } from 'next/font/google';
import './globals.css';

// app/layout.tsx

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const geometric = localFont({
  src: [
    {
      path: '/fonts/geometric-light.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '/fonts/geometric-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/geometric-ultra.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geometric',
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
      <body
        className={`${geist.variable} ${geometric.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
