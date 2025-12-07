'use client';

import FileConverter from '@/components/FileConverter';
import { htmlToPdf } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HtmlToPdfPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        HTML to PDF
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Convert HTML files to PDF documents.
                    </p>
                </div>

                <div className="flex justify-center">
                    <FileConverter
                        title="HTML to PDF"
                        description="Upload your HTML file to convert to PDF."
                        accept=".html,.htm"
                        onConvert={(file) => htmlToPdf(file)}
                        outputExtension=".pdf"
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
