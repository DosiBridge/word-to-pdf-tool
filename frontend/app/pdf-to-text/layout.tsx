import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pdf To Text Converter',
  description: 'Free online tool to pdf to text. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/pdf-to-text',
  },
  openGraph: {
    title: 'Pdf To Text Converter | DosiBridge',
    description: 'Free online tool to pdf to text. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/pdf-to-text',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
