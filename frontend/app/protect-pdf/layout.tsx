import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Protect Pdf Converter',
  description: 'Free online tool to protect pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/protect-pdf',
  },
  openGraph: {
    title: 'Protect Pdf Converter | DosiBridge',
    description: 'Free online tool to protect pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/protect-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
