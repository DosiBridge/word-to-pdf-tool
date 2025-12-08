'use client';

import FileConverter from '@/components/FileConverter';
import { addPageNumbers } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AddPageNumbersPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Add Page Numbers
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Add page numbers to your PDF documents automatically.
                    </p>
                </div>

                <div className="flex justify-center">
                    <FileConverter
                        title="Add Page Numbers"
                        description="Upload your PDF file to add page numbers at the bottom center."
                        accept=".pdf"
                        onConvert={(file) => addPageNumbers(file, 'bottom-center', 'Page {n} of {total}', 1, 12)}
                        outputExtension=".pdf"
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
