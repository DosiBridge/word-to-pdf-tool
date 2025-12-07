'use client';

import MultiFileConverter from '@/components/MultiFileConverter';
import { comparePdfs } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ComparePdfPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Compare PDFs
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Compare two PDF documents and highlight differences.
                    </p>
                </div>

                <div className="flex justify-center">
                    <MultiFileConverter
                        title="Compare PDFs"
                        description="Upload exactly 2 PDF files to compare."
                        accept=".pdf"
                        onConvert={comparePdfs}
                        outputExtension=".pdf"
                        outputFilename="comparison_result.pdf"
                        minFiles={2}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
