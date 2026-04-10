import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Remove Pages - Free Tool',
  description: 'Free online tool to remove pages. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/remove-pages',
  },
  openGraph: {
    title: 'Remove Pages - Free Tool | DosiBridge',
    description: 'Free online tool to remove pages. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/remove-pages',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
