'use client';

import TextConverter from '@/components/TextConverter';
import { convertBijoyToUnicode } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BijoyToUnicodePage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Bijoy to Unicode Converter
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Convert Bijoy encoded text to standard Bengali Unicode.
                    </p>
                </div>

                <div className="flex justify-center">
                    <TextConverter
                        title="Bijoy to Unicode"
                        description="Enter Bijoy encoded text to convert to Unicode Bengali."
                        inputPlaceholder="Paste Bijoy encoded text here..."
                        onConvert={convertBijoyToUnicode}
                        showBijoyInput={true}
                    />
                </div>
            </main>
            <Footer />
        </div>
    );
}
