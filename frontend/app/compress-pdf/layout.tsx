import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compress Pdf',
  description: 'Free online tool to compress pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/compress-pdf',
  },
  openGraph: {
    title: 'Compress Pdf | DosiBridge',
    description: 'Free online tool to compress pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/compress-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
