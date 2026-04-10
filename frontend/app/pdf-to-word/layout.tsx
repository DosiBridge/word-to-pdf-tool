import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pdf To Word Converter',
  description: 'Free online tool to pdf to word. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/pdf-to-word',
  },
  openGraph: {
    title: 'Pdf To Word Converter | DosiBridge',
    description: 'Free online tool to pdf to word. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/pdf-to-word',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
