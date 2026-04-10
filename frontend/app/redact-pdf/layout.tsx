import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redact Pdf Converter',
  description: 'Free online tool to redact pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/redact-pdf',
  },
  openGraph: {
    title: 'Redact Pdf Converter | DosiBridge',
    description: 'Free online tool to redact pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/redact-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
