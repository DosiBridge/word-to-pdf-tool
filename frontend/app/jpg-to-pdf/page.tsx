'use client';

import MultiFileConverter from '@/components/MultiFileConverter';
import { jpgToPdf } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function JpgToPdfPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        JPG to PDF
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Convert multiple images into a single PDF document.
                    </p>
                </div>

                <div className="flex justify-center">
                    <MultiFileConverter
                        title="JPG to PDF"
                        description="Upload images to combine into a PDF."
                        accept=".jpg,.jpeg,.png,.bmp,.gif,.webp"
                        onConvert={jpgToPdf}
                        outputExtension=".pdf"
                        outputFilename="images_combined.pdf"
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
