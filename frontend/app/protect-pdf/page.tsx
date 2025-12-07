'use client';

import { useState } from 'react';
import { protectPdf, downloadFile } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ProtectPdfPage() {
    const [file, setFile] = useState<File | null>(null);
    const [password, setPassword] = useState('');
    const [allowPrinting, setAllowPrinting] = useState(true);
    const [allowCopying, setAllowCopying] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleConvert = async () => {
        if (!file) {
            setError('Please select a file');
            return;
        }
        if (!password.trim()) {
            setError('Please enter a password');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const blob = await protectPdf(file, password, undefined, allowPrinting, allowCopying);
            downloadFile(blob, `protected_${file.name}`);
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Protection failed');
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
                        Protect PDF
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Add password protection to your PDF documents.
                    </p>
                </div>

                <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Select PDF File
                            </label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => {
                                    setFile(e.target.files?.[0] || null);
                                    setError(null);
                                    setSuccess(false);
                                }}
                                className="block w-full text-sm text-zinc-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password to protect PDF"
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={allowPrinting}
                                    onChange={(e) => setAllowPrinting(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-300 rounded"
                                    disabled={loading}
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300">Allow printing</span>
                            </label>

                            <label className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={allowCopying}
                                    onChange={(e) => setAllowCopying(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-zinc-300 rounded"
                                    disabled={loading}
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300">Allow copying text</span>
                            </label>
                        </div>

                        <button
                            onClick={handleConvert}
                            disabled={!file || !password || loading}
                            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 text-white font-semibold rounded-md transition-colors disabled:cursor-not-allowed"
                        >
                            {loading ? 'Protecting...' : 'Protect PDF'}
                        </button>

                        {error && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                                <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                                <p className="text-sm text-green-800 dark:text-green-300">
                                    PDF protected successfully! File downloaded.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
