'use client';

import { useState } from 'react';
import { addWatermark, downloadFile } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AddWatermarkPage() {
    const [file, setFile] = useState<File | null>(null);
    const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
    const [color, setColor] = useState('gray');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleConvert = async () => {
        if (!file) {
            setError('Please select a file');
            return;
        }
        if (!watermarkText.trim()) {
            setError('Please enter watermark text');
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const blob = await addWatermark(file, watermarkText, 0.3, 45, 60, color);
            downloadFile(blob, `watermarked_${file.name}`);
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Operation failed');
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
                        Add Watermark
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Add a text watermark to your PDF documents.
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
                                Watermark Text
                            </label>
                            <input
                                type="text"
                                value={watermarkText}
                                onChange={(e) => setWatermarkText(e.target.value)}
                                placeholder="Enter watermark text"
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={loading}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Color
                            </label>
                            <select
                                value={color}
                                onChange={(e) => setColor(e.target.value)}
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={loading}
                            >
                                <option value="gray">Gray</option>
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                <option value="black">Black</option>
                            </select>
                        </div>

                        <button
                            onClick={handleConvert}
                            disabled={!file || loading}
                            className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 text-white font-semibold rounded-md transition-colors disabled:cursor-not-allowed"
                        >
                            {loading ? 'Adding Watermark...' : 'Add Watermark'}
                        </button>

                        {error && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                                <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                            </div>
                        )}

                        {success && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                                <p className="text-sm text-green-800 dark:text-green-300">
                                    Watermark added successfully! File downloaded.
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
