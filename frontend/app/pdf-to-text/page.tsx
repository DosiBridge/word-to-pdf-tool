'use client';

import FileConverter from '@/components/FileConverter';
import { convertPdfToTxt } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PdfToTextPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        PDF to Text Converter
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Extract text content from your PDF files instantly.
                    </p>
                </div>

                <div className="flex justify-center">
                    <FileConverter
                        title="PDF to Text"
                        description="Upload your PDF file to extract plain text."
                        accept=".pdf"
                        onConvert={convertPdfToTxt}
                        outputExtension=".txt"
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
