import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merge Pdf',
  description: 'Free online tool to merge pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/merge-pdf',
  },
  openGraph: {
    title: 'Merge Pdf | DosiBridge',
    description: 'Free online tool to merge pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/merge-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
