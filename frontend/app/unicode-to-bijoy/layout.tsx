import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unicode to Bijoy Converter - Free Bengali Text Tool',
  description: 'Convert Bengali Unicode text to Bijoy format instantly. Free Unicode to Bijoy converter for legacy Bangla typing, print layouts, and old software workflows.',
  keywords: ['unicode to bijoy', 'bijoy converter', 'bangla unicode to bijoy', 'bengali text converter', 'unicode bangla converter'],
  alternates: {
    canonical: '/unicode-to-bijoy',
  },
  openGraph: {
    title: 'Unicode to Bijoy Converter - Free Bengali Text Tool | DosiBridge',
    description: 'Convert Bengali Unicode text to Bijoy format instantly for legacy Bangla documents and publishing workflows.',
    url: 'https://converter.dosibridge.com/unicode-to-bijoy',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
