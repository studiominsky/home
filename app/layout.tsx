import type { Metadata } from 'next';
import localFont from 'next/font/local';

import './globals.css';

const geometric = localFont({
  src: [
    {
      path: '/fonts/geometric-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/geometric-light.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '/fonts/geometric-ultra.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Studio Minsky',
  description: 'Web development studio based in Vienna, Austria.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geometric.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
