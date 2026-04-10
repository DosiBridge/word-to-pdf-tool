import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Split Pdf',
  description: 'Free online tool to split pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/split-pdf',
  },
  openGraph: {
    title: 'Split Pdf | DosiBridge',
    description: 'Free online tool to split pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/split-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
