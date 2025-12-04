'use client';

import { mergePdfs, downloadFile } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function MergePdfPage() {
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
            setError(null);
        }
    };

    const handleMerge = async () => {
        if (files.length < 2) {
            setError('Please select at least 2 PDF files');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const blob = await mergePdfs(files);
            downloadFile(blob, 'merged_document.pdf');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Merge failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                        Merge PDF
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Combine multiple PDF files into one document.
                    </p>
                </div>

                <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Select PDF Files
                            </label>
                            <input
                                type="file"
                                accept=".pdf"
                                multiple
                                onChange={handleFileChange}
                                className="block w-full text-sm text-zinc-500 dark:text-zinc-400
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100
                        dark:file:bg-blue-900 dark:file:text-blue-300
                        dark:hover:file:bg-blue-800
                        cursor-pointer"
                            />
                            {files.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Selected Files:</p>
                                    <ul className="list-disc list-inside text-sm text-zinc-600 dark:text-zinc-400">
                                        {files.map((file, index) => (
                                            <li key={index}>{file.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleMerge}
                            disabled={files.length < 2 || loading}
                            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400
                    text-white font-semibold rounded-md transition-colors
                    disabled:cursor-not-allowed"
                        >
                            {loading ? 'Merging...' : 'Merge PDFs'}
                        </button>

                        {error && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                                <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="max-w-4xl mx-auto mt-20">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">How to Merge PDF Files</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold">1</div>
                            <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-100">Select Files</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Choose multiple PDF files from your device that you want to combine.</p>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold">2</div>
                            <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-100">Merge</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Click the "Merge PDFs" button to start the process. Our tool will combine them instantly.</p>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold">3</div>
                            <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-100">Download</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Download your single merged PDF document immediately.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
