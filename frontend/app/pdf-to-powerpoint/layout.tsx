import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pdf To Powerpoint Converter',
  description: 'Free online tool to pdf to powerpoint. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/pdf-to-powerpoint',
  },
  openGraph: {
    title: 'Pdf To Powerpoint Converter | DosiBridge',
    description: 'Free online tool to pdf to powerpoint. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/pdf-to-powerpoint',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
