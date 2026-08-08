import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Newsroom | BTV LIVE Business News',
  description: 'Latest business news, corporate updates, and industry insights from BTV LIVE.',
  alternates: { canonical: 'https://www.btvlive.net/newsroom' },
};
export default function NewsroomLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
