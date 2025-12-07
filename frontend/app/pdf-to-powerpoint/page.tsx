'use client';

import FileConverter from '@/components/FileConverter';
import { pdfToPptx } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PdfToPowerPointPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        PDF to PowerPoint
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Convert PDF documents to PowerPoint presentations.
                    </p>
                </div>

                <div className="flex justify-center">
                    <FileConverter
                        title="PDF to PowerPoint"
                        description="Upload your PDF file to convert to PowerPoint."
                        accept=".pdf"
                        onConvert={pdfToPptx}
                        outputExtension=".pptx"
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
