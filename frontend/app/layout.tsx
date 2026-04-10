import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AOSInit from '@/components/AOSInit';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'DosiBridge - Professional PDF Converter & Editor',
    template: '%s | DosiBridge',
  },
  description: 'Convert, compress, merge, and secure PDFs with 30+ professional tools. Fast, free, and secure. No registration required.',
  keywords: [
    'word to pdf', 'word to pdf converter', 'convert word to pdf', 'free word to pdf converter', 
    'doc to pdf', 'docx to pdf', 'pdf tools online', 'merge pdf', 'compress pdf', 'split pdf', 'edit pdf', 
    'pdf to excel', 'pdf to word', 'secure pdf', 'excel to pdf', 'pdf to powerpoint', 'powerpoint to pdf', 
    'pdf to jpg', 'jpg to pdf', 'rotate pdf', 'extract pages from pdf', 'remove pages from pdf', 
    'organize pdf', 'crop pdf', 'add watermark to pdf', 'add page numbers to pdf', 'protect pdf', 
    'unlock pdf', 'sign pdf', 'redact pdf', 'ocr pdf', 'repair pdf', 'html to pdf', 'pdf to pdfa', 
    'pdf to text', 'compare pdf', 'unicode to bijoy', 'bijoy to unicode converter'
  ],
  authors: [{ name: 'DosiBridge' }],
  creator: 'DosiBridge',
  publisher: 'DosiBridge',
  metadataBase: new URL('https://converter.dosibridge.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DosiBridge - Professional PDF Converter & Editor',
    description: 'Convert, compress, merge, and secure your PDF files in seconds with DosiBridge. Free, fast, and easy to use.',
    url: 'https://converter.dosibridge.com',
    siteName: 'DosiBridge',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DosiBridge - Professional PDF Converter & Editor',
    description: 'Convert, compress, merge, and secure your PDF files in seconds with DosiBridge.',
    creator: '@DosiBridge',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
        {children}
        <AOSInit />
      </body>
    </html>
  );
}
