'use client';

import TextConverter from '@/components/TextConverter';
import { convertUnicodeToBijoy } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What is Unicode to Bijoy conversion?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Unicode to Bijoy conversion changes standard Bengali Unicode text into legacy Bijoy format for older Bangla fonts, desktop publishing workflows, and software that still expects Bijoy encoded text.',
            },
        },
        {
            '@type': 'Question',
            name: 'When should I convert Unicode Bangla to Bijoy?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Use Unicode to Bijoy conversion when a printing house, old DTP file, or legacy application requires Bijoy or SutonnyMJ style encoded Bangla text instead of modern Unicode.',
            },
        },
        {
            '@type': 'Question',
            name: 'Can I convert Bijoy back to Unicode later?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. DosiBridge also provides a Bijoy to Unicode converter for converting legacy Bijoy Bangla text back to modern Bengali Unicode.',
            },
        },
    ],
};

export default function UnicodeToBijoyPage() {
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
                        Unicode to Bijoy Converter
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Convert Bengali Unicode text to Bijoy encoding for legacy Bangla fonts, printing,
                        desktop publishing, old office files, and software that still requires Bijoy text.
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

                <section className="max-w-4xl mx-auto mt-16 grid gap-8 text-zinc-700 dark:text-zinc-300">
                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-900/60">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                            Why convert Unicode Bangla text to Bijoy?
                        </h2>
                        <p className="leading-7">
                            Unicode is the modern standard for Bengali text, but many older Bangla publishing
                            workflows still depend on Bijoy-style text and fonts. If a print shop, old layout file,
                            or legacy office system asks for Bijoy format, this converter helps you transform clean
                            Bengali Unicode text into the older encoding without retyping the whole document.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                                Useful for legacy workflows
                            </h2>
                            <ul className="list-disc pl-5 space-y-2 leading-7">
                                <li>Prepare Bangla text for old Bijoy or SutonnyMJ based documents.</li>
                                <li>Send Bengali content to print or publishing teams that require Bijoy format.</li>
                                <li>Reuse modern Unicode Bangla copy in legacy desktop publishing software.</li>
                                <li>Convert typed Unicode text without manually rebuilding the document.</li>
                            </ul>
                        </div>
                        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                                Conversion tips
                            </h2>
                            <ol className="list-decimal pl-5 space-y-2 leading-7">
                                <li>Start with clean Bengali Unicode text from a trusted source.</li>
                                <li>Convert the text and check the preview before using it in a design file.</li>
                                <li>Use the expected Bijoy-compatible font in the target software.</li>
                                <li>Keep a Unicode copy as your master version for future editing and SEO.</li>
                            </ol>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
                        <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                            Frequently asked questions
                        </h2>
                        <div className="space-y-5 leading-7">
                            <div>
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">What is Unicode to Bijoy conversion?</h3>
                                <p>It converts modern Bengali Unicode text into legacy Bijoy-style encoding for older Bangla fonts and software.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">When should I convert Unicode Bangla to Bijoy?</h3>
                                <p>Use it when a printing, DTP, or legacy application workflow specifically requires Bijoy encoded Bangla text.</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Can I convert Bijoy back to Unicode later?</h3>
                                <p>Yes. Use the DosiBridge Bijoy to Unicode converter to turn legacy Bangla text back into modern Unicode.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
