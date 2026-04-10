import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pdf To Jpg Converter',
  description: 'Free online tool to pdf to jpg. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/pdf-to-jpg',
  },
  openGraph: {
    title: 'Pdf To Jpg Converter | DosiBridge',
    description: 'Free online tool to pdf to jpg. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/pdf-to-jpg',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
