import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Pdf Converter',
  description: 'Free online tool to compare pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/compare-pdf',
  },
  openGraph: {
    title: 'Compare Pdf Converter | DosiBridge',
    description: 'Free online tool to compare pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/compare-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
