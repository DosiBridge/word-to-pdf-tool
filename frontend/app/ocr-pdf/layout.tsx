import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ocr Pdf Converter',
  description: 'Free online tool to ocr pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/ocr-pdf',
  },
  openGraph: {
    title: 'Ocr Pdf Converter | DosiBridge',
    description: 'Free online tool to ocr pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/ocr-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
