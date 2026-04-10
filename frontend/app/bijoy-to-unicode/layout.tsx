import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bijoy To Unicode - Free Tool',
  description: 'Free online tool to bijoy to unicode. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/bijoy-to-unicode',
  },
  openGraph: {
    title: 'Bijoy To Unicode - Free Tool | DosiBridge',
    description: 'Free online tool to bijoy to unicode. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/bijoy-to-unicode',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
