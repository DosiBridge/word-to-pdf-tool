'use client';

import FileConverter from '@/components/FileConverter';
import { repairPdf } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RepairPdfPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Repair PDF
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Attempt to repair corrupted or damaged PDF files.
                    </p>
                </div>

                <div className="flex justify-center">
                    <FileConverter
                        title="Repair PDF"
                        description="Upload a corrupted PDF file to attempt repair."
                        accept=".pdf"
                        onConvert={repairPdf}
                        outputExtension=".pdf"
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
