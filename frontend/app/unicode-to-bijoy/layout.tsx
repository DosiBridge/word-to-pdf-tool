import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unicode To Bijoy - Free Tool',
  description: 'Free online tool to unicode to bijoy. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/unicode-to-bijoy',
  },
  openGraph: {
    title: 'Unicode To Bijoy - Free Tool | DosiBridge',
    description: 'Free online tool to unicode to bijoy. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/unicode-to-bijoy',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
