import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import ConditionalLayout from '@/components/layout/ConditionalLayout';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { prisma } from '@/lib/prisma';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://btv-live-72s3.vercel.app'),
  title: {
    default: 'BTV LIVE — The Trusted Business Channel',
    template: '%s | BTV LIVE',
  },
  description: 'Inspiring Success. Creating Legacy. India premier Business and Lifestyle Media Platform.',
  keywords: ['business interviews', 'entrepreneur stories', 'BTV LIVE', 'success stories India'],
  icons: { icon: '/favicon.ico' },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await prisma.siteSettings.findFirst().catch(() => null);
  const theme = settings?.theme || 'dark';

  return (
    <html lang='en' suppressHydrationWarning data-theme={theme}>
      <body className={`min-h-screen antialiased ${inter.variable} ${sora.variable}`} style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', fontFamily: 'var(--font-inter, sans-serif)' }}>
        <ThemeProvider defaultTheme={theme}>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
