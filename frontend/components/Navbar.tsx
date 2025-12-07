'use client';

import Link from 'next/link';
import { useState } from 'react';

const toolCategories = {
    convert: {
        name: 'Convert',
        icon: '🔄',
        tools: [
            { name: 'PDF to Word', href: '/pdf-to-word', icon: '📝' },
            { name: 'Word to PDF', href: '/word-to-pdf', icon: '📄' },
            { name: 'PDF to Excel', href: '/pdf-to-excel', icon: '📈' },
            { name: 'Excel to PDF', href: '/excel-to-pdf', icon: '📊' },
            { name: 'PDF to PowerPoint', href: '/pdf-to-powerpoint', icon: '📊' },
            { name: 'PowerPoint to PDF', href: '/powerpoint-to-pdf', icon: '📽️' },
            { name: 'HTML to PDF', href: '/html-to-pdf', icon: '🌐' },
            { name: 'PDF to Text', href: '/pdf-to-text', icon: '✍️' },
        ],
    },
    organize: {
        name: 'Organize',
        icon: '📋',
        tools: [
            { name: 'Merge PDF', href: '/merge-pdf', icon: '🖇️' },
            { name: 'Split PDF', href: '/split-pdf', icon: '✂️' },
            { name: 'Extract Pages', href: '/extract-pages', icon: '📑' },
            { name: 'Remove Pages', href: '/remove-pages', icon: '🗑️' },
            { name: 'Organize PDF', href: '/organize-pdf', icon: '📋' },
            { name: 'Rotate PDF', href: '/rotate-pdf', icon: '🔄' },
        ],
    },
    edit: {
        name: 'Edit',
        icon: '✏️',
        tools: [
            { name: 'Compress PDF', href: '/compress-pdf', icon: '🗜️' },
            { name: 'Crop PDF', href: '/crop-pdf', icon: '✂️' },
            { name: 'Add Page Numbers', href: '/add-page-numbers', icon: '🔢' },
            { name: 'Add Watermark', href: '/add-watermark', icon: '💧' },
            { name: 'PDF to JPG', href: '/pdf-to-jpg', icon: '🖼️' },
            { name: 'JPG to PDF', href: '/jpg-to-pdf', icon: '📷' },
        ],
    },
    secure: {
        name: 'Secure',
        icon: '🔐',
        tools: [
            { name: 'Protect PDF', href: '/protect-pdf', icon: '🔐' },
            { name: 'Unlock PDF', href: '/unlock-pdf', icon: '🔓' },
            { name: 'Sign PDF', href: '/sign-pdf', icon: '✒️' },
            { name: 'Redact PDF', href: '/redact-pdf', icon: '▓' },
        ],
    },
    advanced: {
        name: 'Advanced',
        icon: '⚡',
        tools: [
            { name: 'OCR PDF', href: '/ocr-pdf', icon: '👁️' },
            { name: 'Repair PDF', href: '/repair-pdf', icon: '🔧' },
            { name: 'Compare PDF', href: '/compare-pdf', icon: '🔍' },
            { name: 'PDF to PDF/A', href: '/pdf-to-pdfa', icon: '📦' },
        ],
    },
    bijoy: {
        name: 'Bijoy',
        icon: '🔤',
        tools: [
            { name: 'Unicode to Bijoy', href: '/unicode-to-bijoy', icon: '🔤' },
            { name: 'Bijoy to Unicode', href: '/bijoy-to-unicode', icon: '🔠' },
        ],
    },
};

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    return (
        <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex flex-col group">
                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            DosiBridge
                        </span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">
                            Document Converter
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {Object.entries(toolCategories).map(([key, category]) => (
                            <div
                                key={key}
                                className="relative group"
                                onMouseEnter={() => setActiveDropdown(key)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <button className="px-3 py-2 text-sm font-medium text-zinc-700 hover:text-blue-600 dark:text-zinc-300 dark:hover:text-blue-400 transition-colors flex items-center gap-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                    <span className="text-base">{category.icon}</span>
                                    <span>{category.name}</span>
                                    <svg
                                        className={`w-3 h-3 transition-transform ${activeDropdown === key ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <div
                                    className={`absolute top-full left-0 mt-1 w-56 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800 py-2 transition-all ${activeDropdown === key
                                            ? 'opacity-100 visible translate-y-0'
                                            : 'opacity-0 invisible -translate-y-2'
                                        }`}
                                >
                                    {category.tools.map((tool) => (
                                        <Link
                                            key={tool.href}
                                            href={tool.href}
                                            className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-700 hover:bg-blue-50 dark:text-zinc-300 dark:hover:bg-zinc-800 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                        >
                                            <span className="text-lg">{tool.icon}</span>
                                            <span>{tool.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://dosibridge.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:block text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                        >
                            About
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6 text-zinc-700 dark:text-zinc-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 max-h-[calc(100vh-4rem)] overflow-y-auto">
                    <div className="container mx-auto px-4 py-4 space-y-4">
                        {Object.entries(toolCategories).map(([key, category]) => (
                            <div key={key}>
                                <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-2">
                                    <span className="text-lg">{category.icon}</span>
                                    <span>{category.name}</span>
                                </div>
                                <div className="space-y-1 pl-6">
                                    {category.tools.map((tool) => (
                                        <Link
                                            key={tool.href}
                                            href={tool.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center gap-2 py-2 text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors"
                                        >
                                            <span>{tool.icon}</span>
                                            <span>{tool.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
