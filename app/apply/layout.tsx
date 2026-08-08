import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Nominate a Leader | Apply to be Featured | BTV LIVE',
  description: 'Nominate yourself or someone whose inspiring story deserves a global stage. BTV LIVE features entrepreneurs, doctors, innovators and business leaders.',
  openGraph: { title: 'Nominate a Leader | BTV LIVE', description: 'Share your story with millions of viewers on BTV LIVE.' },
  alternates: { canonical: 'https://www.btvlive.net/apply' },
};
export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
