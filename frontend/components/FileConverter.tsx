'use client';

import { downloadFile } from '@/lib/api';
import { useState, useRef } from 'react';

interface FileConverterProps {
    title: string;
    description: string;
    accept: string;
    onConvert: (file: File, password?: string) => Promise<Blob>;
    outputExtension: string;
    showPassword?: boolean;
}

export default function FileConverter({
    title,
    description,
    accept,
    onConvert,
    outputExtension,
    showPassword = false,
}: FileConverterProps) {
    const [file, setFile] = useState<File | null>(null);
    const [password, setPassword] = useState('');
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

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFile = (selectedFile: File) => {
        setFile(selectedFile);
        setError(null);
        setSuccess(false);
        setProgress(0);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            handleFile(selectedFile);
        }
    };

    const handleConvert = async () => {
        if (!file) {
            setError('Please select a file');
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

            const blob = await onConvert(file, showPassword ? password : undefined);

            clearInterval(progressInterval);
            setProgress(100);

            const outputFilename = file.name.replace(/\.[^/.]+$/, '') + outputExtension;
            downloadFile(blob, outputFilename);

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

    const removeFile = () => {
        setFile(null);
        setProgress(0);
        setSuccess(false);
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-900 p-6 border-b border-zinc-200 dark:border-zinc-700">
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
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 scale-105'
                                : 'border-zinc-300 dark:border-zinc-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                            }
                            ${file ? 'bg-green-50 dark:bg-green-950/20 border-green-500' : ''}
                        `}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept={accept}
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={loading}
                        />

                        <div className="text-center">
                            {!file ? (
                                <>
                                    <div className="mx-auto w-16 h-16 mb-4 text-blue-500 dark:text-blue-400 animate-bounce">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                                        Drop your file here or click to browse
                                    </p>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                        Supports: {accept.split(',').join(', ')}
                                    </p>
                                </>
                            ) : (
                                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                                    <div className="mx-auto w-16 h-16 mb-4 text-green-500">
                                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFile();
                                        }}
                                        className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                                    >
                                        Remove file
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Password Input */}
                    {showPassword && (
                        <div className="animate-in fade-in slide-in-from-top-4 duration-300">
                            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                Password (optional)
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter PDF password if required"
                                className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-lg
                                    bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    transition-all duration-200"
                                disabled={loading}
                            />
                        </div>
                    )}

                    {/* Progress Bar */}
                    {loading && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className="flex justify-between text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                                <span>Converting...</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Convert Button */}
                    <button
                        onClick={handleConvert}
                        disabled={!file || loading}
                        className="group relative w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 
                            hover:from-blue-700 hover:to-purple-700 disabled:from-zinc-400 disabled:to-zinc-400
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
                                    <span>Converting...</span>
                                </>
                            ) : (
                                <>
                                    <span>Convert File</span>
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
