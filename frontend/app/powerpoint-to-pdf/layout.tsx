import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Powerpoint To Pdf Converter',
  description: 'Free online tool to powerpoint to pdf. Fast, secure, and easy to use.',
  alternates: {
    canonical: '/powerpoint-to-pdf',
  },
  openGraph: {
    title: 'Powerpoint To Pdf Converter | DosiBridge',
    description: 'Free online tool to powerpoint to pdf. Fast, secure, and easy to use.',
    url: 'https://converter.dosibridge.com/powerpoint-to-pdf',
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
