'use client';

import FileConverter from '@/components/FileConverter';
import { pptxToPdf } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PowerPointToPdfPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        PowerPoint to PDF
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Convert PowerPoint presentations to PDF documents.
                    </p>
                </div>

                <div className="flex justify-center">
                    <FileConverter
                        title="PowerPoint to PDF"
                        description="Upload your PowerPoint file (.pptx or .ppt) to convert to PDF."
                        accept=".pptx,.ppt"
                        onConvert={pptxToPdf}
                        outputExtension=".pdf"
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
