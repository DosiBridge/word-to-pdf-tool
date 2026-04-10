import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Extract Pages - Free Tool',
  description: 'Free online tool to extract pages. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/extract-pages',
  },
  openGraph: {
    title: 'Extract Pages - Free Tool | DosiBridge',
    description: 'Free online tool to extract pages. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/extract-pages',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
