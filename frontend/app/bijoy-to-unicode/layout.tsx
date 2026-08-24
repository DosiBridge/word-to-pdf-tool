import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bijoy to Unicode Converter - Free Bengali Text Tool',
  description: 'Convert Bijoy Bangla text to standard Unicode instantly. Free Bengali Bijoy to Unicode converter for old documents, typing, websites, and copy-paste workflows.',
  keywords: ['bijoy to unicode', 'bijoy converter', 'bangla unicode converter', 'bijoy bangla to unicode', 'bengali text converter'],
  alternates: {
    canonical: '/bijoy-to-unicode',
  },
  openGraph: {
    title: 'Bijoy to Unicode Converter - Free Bengali Text Tool | DosiBridge',
    description: 'Convert Bijoy Bangla text to standard Unicode instantly for websites, email, documents, and social media.',
    url: 'https://converter.dosibridge.com/bijoy-to-unicode',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
