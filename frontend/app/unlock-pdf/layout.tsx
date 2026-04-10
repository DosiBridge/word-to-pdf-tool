import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unlock Pdf Converter',
  description: 'Free online tool to unlock pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/unlock-pdf',
  },
  openGraph: {
    title: 'Unlock Pdf Converter | DosiBridge',
    description: 'Free online tool to unlock pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/unlock-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
