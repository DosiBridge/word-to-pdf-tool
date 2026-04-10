import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crop Pdf Converter',
  description: 'Free online tool to crop pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/crop-pdf',
  },
  openGraph: {
    title: 'Crop Pdf Converter | DosiBridge',
    description: 'Free online tool to crop pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/crop-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
