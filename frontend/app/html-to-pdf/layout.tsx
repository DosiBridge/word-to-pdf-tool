import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Html To Pdf Converter',
  description: 'Free online tool to html to pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/html-to-pdf',
  },
  openGraph: {
    title: 'Html To Pdf Converter | DosiBridge',
    description: 'Free online tool to html to pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/html-to-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
