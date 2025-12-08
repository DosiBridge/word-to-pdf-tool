'use client';

import { downloadFile } from '@/lib/api';
import { useState, useRef } from 'react';

interface MultiFileConverterProps {
    title: string;
    description: string;
    accept: string;
    onConvert: (files: File[]) => Promise<Blob>;
    outputExtension: string;
    outputFilename?: string;
    minFiles?: number;
}

export default function MultiFileConverter({
    title,
    description,
    accept,
    onConvert,
    outputExtension,
    outputFilename,
    minFiles = 2,
}: MultiFileConverterProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files);
            setFiles(prev => [...prev, ...newFiles]);
            setError(null);
            setSuccess(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setFiles(prev => [...prev, ...newFiles]);
            setError(null);
            setSuccess(false);
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setSuccess(false);
        setError(null);
    };

    const clearAll = () => {
        setFiles([]);
        setProgress(0);
        setSuccess(false);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleConvert = async () => {
        if (files.length < minFiles) {
            setError(`Please select at least ${minFiles} files`);
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(false);
        setProgress(0);

        try {
            // Simulate progress
            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return 90;
                    }
                    return prev + 10;
                });
            }, 150);

            const blob = await onConvert(files);

            clearInterval(progressInterval);
            setProgress(100);

            const filename = outputFilename || `merged${outputExtension}`;
            downloadFile(blob, filename);

            setTimeout(() => {
                setSuccess(true);
            }, 300);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Conversion failed');
            setProgress(0);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-zinc-800 dark:to-zinc-900 p-6 border-b border-zinc-200 dark:border-zinc-700">
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
                </div>

                <div className="p-6 space-y-6">
                    {/* Drag & Drop Zone */}
                    <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 cursor-pointer
                            ${dragActive
                                ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30 scale-105'
                                : 'border-zinc-300 dark:border-zinc-700 hover:border-purple-400 dark:hover:border-purple-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                            }
                        `}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={accept}
                            onChange={handleFileChange}
                            multiple
                            className="hidden"
                            disabled={loading}
                        />

                        <div className="text-center">
                            <div className="mx-auto w-16 h-16 mb-4 text-purple-500 dark:text-purple-400 animate-bounce">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                                Drop your files here or click to browse
                            </p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                Select or drop multiple files • Minimum {minFiles} files
                            </p>
                        </div>
                    </div>

                    {/* Selected Files List */}
                    {files.length > 0 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 space-y-3">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                    Selected Files ({files.length})
                                </p>
                                <button
                                    onClick={clearAll}
                                    className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                                >
                                    Clear all
                                </button>
                            </div>
                            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                                {files.map((file, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 group hover:border-purple-300 dark:hover:border-purple-700 transition-all"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                {(file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeFile(index)}
                                            className="flex-shrink-0 p-1 text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Progress Bar */}
                    {loading && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                                <span>Processing {files.length} files...</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Convert Button */}
                    <button
                        onClick={handleConvert}
                        disabled={files.length < minFiles || loading}
                        className="group relative w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 
                            hover:from-purple-700 hover:to-pink-700 disabled:from-zinc-400 disabled:to-zinc-400
                            text-white font-semibold rounded-xl transition-all duration-200
                            disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]
                            shadow-lg hover:shadow-xl disabled:shadow-none"
                    >
                        <span className="flex items-center justify-center gap-2">
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <span>Convert {files.length} Files</span>
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </>
                            )}
                        </span>
                    </button>

                    {/* Error Message */}
                    {error && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-lg">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                <p className="text-sm text-red-800 dark:text-red-300 font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <div>
                                    <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                                        Conversion successful! 🎉
                                    </p>
                                    <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                                        Your file has been downloaded.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
