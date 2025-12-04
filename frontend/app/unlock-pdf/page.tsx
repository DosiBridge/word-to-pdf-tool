'use client';

import FileConverter from '@/components/FileConverter';
import { unlockPdf } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function UnlockPdfPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Unlock PDF
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Remove password protection from your PDF files.
                    </p>
                </div>

                <div className="flex justify-center">
                    <FileConverter
                        title="Unlock PDF"
                        description="Upload your password-protected PDF to remove restrictions."
                        accept=".pdf"
                        onConvert={unlockPdf}
                        outputExtension=".pdf"
                        showPassword={true}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
