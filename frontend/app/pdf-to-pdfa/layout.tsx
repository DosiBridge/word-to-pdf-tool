import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pdf To Pdfa Converter',
  description: 'Free online tool to pdf to pdfa. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/pdf-to-pdfa',
  },
  openGraph: {
    title: 'Pdf To Pdfa Converter | DosiBridge',
    description: 'Free online tool to pdf to pdfa. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/pdf-to-pdfa',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
