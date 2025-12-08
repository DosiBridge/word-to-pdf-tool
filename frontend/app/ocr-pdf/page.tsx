'use client';

import FileConverter from '@/components/FileConverter';
import { ocrPdf } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function OcrPdfPage() {
    return (
        <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950">
            <Navbar />

            <main className="flex-grow flex items-center justify-center py-20 px-4">
                <div className="w-full max-w-2xl">
                    {/* Installation Notice */}
                    <div className="mb-6 p-6 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-r-lg animate-in fade-in slide-in-from-left-4 duration-500">
                        <div className="flex items-start gap-3">
                            <svg className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-2">
                                    ⚠️ Tesseract OCR Installation Required
                                </h3>
                                <p className="text-sm text-amber-800 dark:text-amber-200 mb-3">
                                    This tool requires Tesseract OCR to be installed on the server. If you see "Failed to fetch" errors, please install Tesseract:
                                </p>
                                <div className="bg-amber-100 dark:bg-amber-900/40 rounded-lg p-3 mb-3 space-y-2">
                                    <p className="text-xs text-amber-900 dark:text-amber-100">
                                        <strong>Windows:</strong> <code className="bg-white dark:bg-zinc-800 px-2 py-1 rounded font-mono">choco install tesseract</code>
                                    </p>
                                    <p className="text-xs text-amber-900 dark:text-amber-100">
                                        <strong>Linux:</strong> <code className="bg-white dark:bg-zinc-800 px-2 py-1 rounded font-mono">sudo apt-get install tesseract-ocr</code>
                                    </p>
                                    <p className="text-xs text-amber-900 dark:text-amber-100">
                                        <strong>Mac:</strong> <code className="bg-white dark:bg-zinc-800 px-2 py-1 rounded font-mono">brew install tesseract</code>
                                    </p>
                                </div>
                                <p className="text-xs text-amber-700 dark:text-amber-300">
                                    📥 Or download from: <a href="https://github.com/UB-Mannheim/tesseract/wiki" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-900 dark:hover:text-amber-100 font-semibold">Tesseract Wiki</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <FileConverter
                        title="OCR PDF"
                        description="Upload a scanned PDF to extract text using OCR (English). Converts images to searchable text."
                        accept=".pdf"
                        onConvert={(file) => ocrPdf(file, 'eng')}
                        outputExtension=".pdf"
                    />
                </div>
            </main>

            <Footer />
        </div>
    );
}
