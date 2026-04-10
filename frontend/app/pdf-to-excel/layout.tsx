import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pdf To Excel Converter',
  description: 'Free online tool to pdf to excel. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/pdf-to-excel',
  },
  openGraph: {
    title: 'Pdf To Excel Converter | DosiBridge',
    description: 'Free online tool to pdf to excel. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/pdf-to-excel',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
