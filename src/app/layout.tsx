import { Geist, Geist_Mono } from 'next/font/google';
import { getServerCookieConfig } from '@/utils/cookieServer';
import './globals.css';
import { getTranslations } from '@/utils/i18n';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata() {
  const cookieConfig = await getServerCookieConfig();
  const t = getTranslations(cookieConfig.locale);

  return { title: t.appHeader.title };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieConfig = await getServerCookieConfig();
  const language = cookieConfig.locale.split('-')[0];

  return (
    <html lang={language}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
