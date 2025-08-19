import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';
import { NextIntlClientProvider } from 'next-intl';

import '@/styles/globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' });
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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: 'en' | 'de' }>;
}) {
  const { locale } = await params;

  const messages = (await import(`@/messages/${locale}.json`))
    .default;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geist.variable} ${mono.variable} ${geometric.variable} antialiased bg-[var(--background)] text-[var(--foreground)]`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider enableSystem defaultTheme="system">
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
