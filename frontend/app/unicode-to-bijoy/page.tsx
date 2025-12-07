'use client';

import TextConverter from '@/components/TextConverter';
import { convertUnicodeToBijoy } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function UnicodeToBijoyPage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Unicode to Bijoy Converter
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Convert Bengali Unicode text to Bijoy encoding for legacy applications.
                    </p>
                </div>

                <div className="flex justify-center">
                    <TextConverter
                        title="Unicode to Bijoy"
                        description="Enter Unicode Bengali text to convert to Bijoy encoding."
                        inputPlaceholder="আমার সোনার বাংলা আমি তোমায় ভালোবাসি..."
                        onConvert={convertUnicodeToBijoy}
                        showBijoyPreview={true}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
