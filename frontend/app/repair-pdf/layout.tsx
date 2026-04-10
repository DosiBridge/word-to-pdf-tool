import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Repair Pdf Converter',
  description: 'Free online tool to repair pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/repair-pdf',
  },
  openGraph: {
    title: 'Repair Pdf Converter | DosiBridge',
    description: 'Free online tool to repair pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/repair-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
