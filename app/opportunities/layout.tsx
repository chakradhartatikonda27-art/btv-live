import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Business Opportunities | Jobs, Tenders, Franchise | BTV LIVE',
  description: 'Find latest business opportunities, jobs, tenders, franchise options and partnership deals across India on BTV LIVE.',
  alternates: { canonical: 'https://www.btvlive.net/opportunities' },
};
export default function OpportunitiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
