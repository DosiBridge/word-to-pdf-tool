import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Page Numbers - Free Tool',
  description: 'Free online tool to add page numbers. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/add-page-numbers',
  },
  openGraph: {
    title: 'Add Page Numbers - Free Tool | DosiBridge',
    description: 'Free online tool to add page numbers. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/add-page-numbers',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
