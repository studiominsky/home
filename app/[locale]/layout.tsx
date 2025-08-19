import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';

import '@/styles/globals.css';
import { NextIntlClientProvider } from 'next-intl';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const mono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
  display: 'swap',
});

const geometric = localFont({
  src: [
    {
      path: '../fonts/geometric-regular.woff2',
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
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geist.variable} ${mono.variable} ${geometric.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <NextIntlClientProvider>
          <ThemeProvider enableSystem={true} defaultTheme="system">
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
