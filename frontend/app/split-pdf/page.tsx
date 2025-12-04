'use client';

import { splitPdf, downloadFile } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function SplitPdfPage() {
    const [file, setFile] = useState<File | null>(null);
    const [pages, setPages] = useState('all');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
            setError(null);
        }
    };

    const handleSplit = async () => {
        if (!file) {
            setError('Please select a PDF file');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const blob = await splitPdf(file, pages);
            downloadFile(blob, `split_${file.name}`);
        } catch (err) {
            console.error('Split PDF error:', err);
            if (err instanceof TypeError && err.message === 'Failed to fetch') {
                setError('Cannot connect to server. Please check if the backend is running on port 8000.');
            } else {
                setError(err instanceof Error ? err.message : 'Split failed');
            }
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
                        Split PDF
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Extract pages from your PDF files.
                    </p>
                </div>

                <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Select PDF File
                            </label>
                            <input
                                type="file"
                                accept=".pdf"
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
                            {file && (
                                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                                    Selected: {file.name}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Page Range
                            </label>
                            <input
                                type="text"
                                value={pages}
                                onChange={(e) => setPages(e.target.value)}
                                placeholder="e.g. 1-5, 8, 11-13 or 'all'"
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md
                        bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100
                        focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="mt-1 text-xs text-zinc-500">
                                Enter page numbers (e.g., 1,3-5) or "all" to extract everything.
                            </p>
                        </div>

                        <button
                            onClick={handleSplit}
                            disabled={!file || loading}
                            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400
                    text-white font-semibold rounded-md transition-colors
                    disabled:cursor-not-allowed"
                        >
                            {loading ? 'Processing...' : 'Split PDF'}
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
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">How to Split PDF Files</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold">1</div>
                            <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-100">Select File</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Upload the PDF file you want to split or extract pages from.</p>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold">2</div>
                            <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-100">Select Pages</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Enter the page numbers or ranges you want to extract (e.g., 1-5, 8).</p>
                        </div>
                        <div className="bg-zinc-50 dark:bg-zinc-900/50 p-6 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold">3</div>
                            <h3 className="font-semibold mb-2 text-zinc-900 dark:text-zinc-100">Download</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">Download your new PDF containing only the selected pages.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
