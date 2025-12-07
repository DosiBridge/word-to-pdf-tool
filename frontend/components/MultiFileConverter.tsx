'use client';

import { downloadFile } from '@/lib/api';
import { useState } from 'react';

interface MultiFileConverterProps {
    title: string;
    description: string;
    accept: string;
    onConvert: (files: File[]) => Promise<Blob>;
    outputExtension: string;
    outputFilename: string;
    minFiles?: number;
}

export default function MultiFileConverter({
    title,
    description,
    accept,
    onConvert,
    outputExtension,
    outputFilename,
    minFiles = 1,
}: MultiFileConverterProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (selectedFiles.length > 0) {
            setFiles(selectedFiles);
            setError(null);
            setSuccess(false);
        }
    };

    const handleConvert = async () => {
        if (files.length < minFiles) {
            setError(`Please select at least ${minFiles} file(s)`);
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const blob = await onConvert(files);
            downloadFile(blob, outputFilename);
            setSuccess(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Conversion failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h2>
                <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Select Files
                    </label>
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleFileChange}
                        multiple
                        className="block w-full text-sm text-zinc-500 dark:text-zinc-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              dark:file:bg-blue-900 dark:file:text-blue-300
              dark:hover:file:bg-blue-800
              cursor-pointer"
                        disabled={loading}
                    />
                    {files.length > 0 && (
                        <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <p>Selected {files.length} file(s):</p>
                            <ul className="list-disc list-inside mt-1 max-h-32 overflow-y-auto">
                                {files.map((file, index) => (
                                    <li key={index}>{file.name} ({(file.size / 1024).toFixed(2)} KB)</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <button
                    onClick={handleConvert}
                    disabled={files.length < minFiles || loading}
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400
            text-white font-semibold rounded-md transition-colors
            disabled:cursor-not-allowed"
                >
                    {loading ? 'Processing...' : 'Convert'}
                </button>

                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                        <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                    </div>
                )}

                {success && (
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                        <p className="text-sm text-green-800 dark:text-green-300">
                            Conversion successful! File downloaded.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
