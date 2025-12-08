'use client';

import FileConverter from '@/components/FileConverter';
import { cropPdf } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CropPdfPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Crop PDF
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Crop margins from your PDF pages.
                    </p>
                </div>

                <div className="flex justify-center">
                    <FileConverter
                        title="Crop PDF"
                        description="Upload your PDF file to crop margins (36pt from each side)."
                        accept=".pdf"
                        onConvert={(file) => cropPdf(file, 36, 36, 36, 36)}
                        outputExtension=".pdf"
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
