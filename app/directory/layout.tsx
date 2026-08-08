import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Business Directory | Find Local Businesses | BTV LIVE',
  description: 'Discover and connect with verified businesses across India.',
  alternates: { canonical: 'https://www.btvlive.net/directory' },
};
export default function DirectoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
