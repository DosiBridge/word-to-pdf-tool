import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Organize Pdf Converter',
  description: 'Free online tool to organize pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/organize-pdf',
  },
  openGraph: {
    title: 'Organize Pdf Converter | DosiBridge',
    description: 'Free online tool to organize pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/organize-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
