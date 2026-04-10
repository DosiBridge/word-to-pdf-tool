import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Watermark - Free Tool',
  description: 'Free online tool to add watermark. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/add-watermark',
  },
  openGraph: {
    title: 'Add Watermark - Free Tool | DosiBridge',
    description: 'Free online tool to add watermark. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/add-watermark',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
