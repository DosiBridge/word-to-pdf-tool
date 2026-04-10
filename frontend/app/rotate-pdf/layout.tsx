import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rotate Pdf Converter',
  description: 'Free online tool to rotate pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/rotate-pdf',
  },
  openGraph: {
    title: 'Rotate Pdf Converter | DosiBridge',
    description: 'Free online tool to rotate pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/rotate-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
