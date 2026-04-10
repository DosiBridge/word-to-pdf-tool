import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jpg To Pdf Converter',
  description: 'Free online tool to jpg to pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/jpg-to-pdf',
  },
  openGraph: {
    title: 'Jpg To Pdf Converter | DosiBridge',
    description: 'Free online tool to jpg to pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/jpg-to-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
