'use client';

import { useState } from 'react';

interface TextConverterProps {
    title: string;
    description: string;
    inputPlaceholder: string;
    onConvert: (text: string) => Promise<string>;
    showBijoyPreview?: boolean;
    showBijoyInput?: boolean;
}

export default function TextConverter({
    title,
    description,
    inputPlaceholder,
    onConvert,
    showBijoyPreview = false,
    showBijoyInput = false,
}: TextConverterProps) {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const handleConvert = async () => {
        if (!inputText.trim()) {
            setError('Please enter some text');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await onConvert(inputText);
            setOutputText(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Conversion failed');
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        if (outputText) {
            await navigator.clipboard.writeText(outputText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleClear = () => {
        setInputText('');
        setOutputText('');
        setError(null);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800">
            {/* Load SutonnyMJ font for Bijoy preview/input */}
            {(showBijoyPreview || showBijoyInput) && (
                <style jsx global>{`
                    @font-face {
                        font-family: 'SutonnyMJ';
                        src: url('/fonts/SutonnyMJ.ttf') format('truetype');
                        font-weight: normal;
                        font-style: normal;
                    }
                `}</style>
            )}

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h2>
                <p className="text-zinc-600 dark:text-zinc-400">{description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Input Text
                    </label>
                    <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={inputPlaceholder}
                        className="w-full h-48 px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-md
                            bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100
                            focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        disabled={loading}
                        style={showBijoyInput ? { fontFamily: 'SutonnyMJ, serif', fontSize: '18px', lineHeight: '1.8' } : undefined}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        Converted Text (Bijoy Encoding)
                    </label>
                    <textarea
                        value={outputText}
                        readOnly
                        placeholder="Converted text will appear here..."
                        className="w-full h-48 px-4 py-3 border border-zinc-300 dark:border-zinc-700 rounded-md
                            bg-zinc-50 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100
                            focus:outline-none resize-none font-mono"
                    />
                </div>
            </div>

            {/* Bijoy Preview Section */}
            {showBijoyPreview && outputText && (
                <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                        📖 Bengali Preview (using Bijoy font)
                    </label>
                    <div
                        className="w-full min-h-24 px-4 py-3 border border-green-300 dark:border-green-700 rounded-md
                            bg-green-50 dark:bg-green-900/20 text-zinc-900 dark:text-zinc-100"
                        style={{ fontFamily: 'SutonnyMJ, serif', fontSize: '18px', lineHeight: '1.8' }}
                    >
                        {outputText}
                    </div>
                    <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                        ℹ️ This preview shows how the text will appear in applications using Bijoy/SutonnyMJ font.
                    </p>
                </div>
            )}

            <div className="flex flex-wrap gap-3">
                <button
                    onClick={handleConvert}
                    disabled={!inputText.trim() || loading}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400
                        text-white font-semibold rounded-md transition-colors
                        disabled:cursor-not-allowed"
                >
                    {loading ? 'Converting...' : 'Convert'}
                </button>

                <button
                    onClick={handleCopy}
                    disabled={!outputText}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-zinc-400
                        text-white font-semibold rounded-md transition-colors
                        disabled:cursor-not-allowed"
                >
                    {copied ? 'Copied!' : 'Copy Result'}
                </button>

                <button
                    onClick={handleClear}
                    className="px-6 py-3 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600
                        text-zinc-700 dark:text-zinc-200 font-semibold rounded-md transition-colors"
                >
                    Clear
                </button>
            </div>

            {error && (
                <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
                </div>
            )}
        </div>
    );
}
