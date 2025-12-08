import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AOSInit from '@/components/AOSInit';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DosiBridge - Professional PDF Converter & Editor',
  description: 'Convert, compress, merge, and secure PDFs with 30+ professional tools. Fast, free, and secure. No registration required.',
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
