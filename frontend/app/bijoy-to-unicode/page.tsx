'use client';

import TextConverter from '@/components/TextConverter';
import { convertBijoyToUnicode } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What is Bijoy to Unicode conversion?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Bijoy to Unicode conversion changes legacy Bijoy encoded Bangla text into standard Bengali Unicode text that works correctly on websites, email, mobile devices, search engines, and modern document editors.',
            },
        },
        {
            '@type': 'Question',
            name: 'When should I use a Bijoy to Unicode converter?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Use it when old Bangla text from Bijoy, SutonnyMJ, or legacy desktop publishing documents appears broken after copy-paste. Converting to Unicode makes the text readable and searchable in modern software.',
            },
        },
        {
            '@type': 'Question',
            name: 'Is this Bijoy to Unicode converter free?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. The DosiBridge Bijoy to Unicode converter is free to use and designed for quick copy-paste Bangla text conversion.',
            },
        },
    ],
};

export default function BijoyToUnicodePage() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />

                <div className="max-w-4xl mx-auto text-center mb-12">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400 mb-3">
                        Free Bengali text converter
                    </p>
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Bijoy to Unicode Converter
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Convert Bijoy encoded Bangla text to standard Bengali Unicode for websites, email,
                        documents, CMS content, mobile apps, and modern publishing workflows.
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

                <section className="max-w-4xl mx-auto mt-16 grid gap-8 text-zinc-700 dark:text-zinc-300">
                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-900/60">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                            Why convert Bijoy Bangla text to Unicode?
                        </h2>
                        <p className="leading-7">
                            Bijoy was widely used for Bangla typing in older desktop publishing and office work.
                            The problem is that Bijoy text is font-dependent: it may look correct only when the same
                            legacy font is installed. Unicode is the modern Bengali text standard, so converted text
                            displays properly in browsers, Google Docs, Microsoft Word, Facebook, websites, mobile
                            keyboards, databases, and search engines.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                                Best use cases
                            </h2>
                            <ul className="list-disc pl-5 space-y-2 leading-7">
                                <li>Recover Bangla text from old Bijoy or SutonnyMJ documents.</li>
                                <li>Prepare Bengali content for websites, blogs, and CMS editors.</li>
                                <li>Make old Bangla text readable on mobile devices and social media.</li>
                                <li>Convert legacy office content before archiving or publishing online.</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                                How to get the best result
                            </h2>
                            <ol className="list-decimal pl-5 space-y-2 leading-7">
                                <li>Paste the original Bijoy encoded Bangla text into the input box.</li>
                                <li>Run the conversion and review the Unicode output.</li>
                                <li>Copy the converted text into your document, website, or editor.</li>
                                <li>If a word still looks unusual, compare it with the original document font.</li>
                            </ol>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                            Frequently asked questions
                        </h2>
                        <div className="space-y-5 leading-7">
                            <div>
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">What is Bijoy to Unicode conversion?</h3>
                                <p>It changes legacy Bijoy encoded Bangla text into standard Bengali Unicode text that works correctly across modern apps and devices.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">When should I use this converter?</h3>
                                <p>Use it when old Bangla copy from Bijoy, SutonnyMJ, or legacy DTP files appears broken after copy-paste or needs to be published online.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Is the converter free?</h3>
                                <p>Yes. It is free for quick Bengali text conversion and copy-paste workflows.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
