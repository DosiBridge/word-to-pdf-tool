import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Excel To Pdf Converter',
  description: 'Free online tool to excel to pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/excel-to-pdf',
  },
  openGraph: {
    title: 'Excel To Pdf Converter | DosiBridge',
    description: 'Free online tool to excel to pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/excel-to-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
