import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Pdf Converter',
  description: 'Free online tool to sign pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/sign-pdf',
  },
  openGraph: {
    title: 'Sign Pdf Converter | DosiBridge',
    description: 'Free online tool to sign pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/sign-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
