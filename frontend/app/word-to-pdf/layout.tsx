import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Word To Pdf Converter',
  description: 'Free online tool to word to pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/word-to-pdf',
  },
  openGraph: {
    title: 'Word To Pdf Converter | DosiBridge',
    description: 'Free online tool to word to pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/word-to-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
