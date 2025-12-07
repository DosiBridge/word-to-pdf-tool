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
        <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
            <div className="container mx-auto px-4">
                <div className="h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
                            D
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                                DosiBridge
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2">
                        {Object.entries(toolCategories).map(([key, category]) => (
                            <div
                                key={key}
                                className="relative group"
                                onMouseEnter={() => setActiveDropdown(key)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <button className={`px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-2 rounded-full hover:bg-white/5 ${activeDropdown === key ? 'text-white bg-white/5' : 'text-zinc-400 hover:text-white'
                                    }`}>
                                    <span>{category.name}</span>
                                    <svg
                                        className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === key ? 'rotate-180 text-blue-500' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <div
                                    className={`absolute top-full left-0 mt-2 w-64 bg-[#0a0a0a] rounded-xl border border-white/10 shadow-2xl shadow-black/50 py-3 transition-all duration-200 origin-top-left ${activeDropdown === key
                                        ? 'opacity-100 visible translate-y-0 scale-100'
                                        : 'opacity-0 invisible -translate-y-2 scale-95'
                                        }`}
                                >
                                    <div className="px-4 py-2 mb-2 border-b border-white/5">
                                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                                            {category.icon} {category.name} Tools
                                        </span>
                                    </div>
                                    <div className="px-2">
                                        {category.tools.map((tool) => (
                                            <Link
                                                key={tool.href}
                                                href={tool.href}
                                                className="flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-all group/item"
                                            >
                                                <span className="text-lg opacity-70 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all">{tool.icon}</span>
                                                <span>{tool.name}</span>
                                            </Link>
                                        ))}
                                    </div>
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
                            className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                        >
                            About
                        </a>
                        <Link
                            href="/pdf-to-word"
                            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-bold rounded-full hover:bg-blue-50 transition-all hover:scale-105 hover:shadow-lg hover:shadow-white/10"
                        >
                            Get Started
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6"
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
                <div className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl h-[calc(100vh-5rem)] overflow-y-auto absolute w-full left-0 top-20">
                    <div className="container mx-auto px-4 py-6 space-y-6">
                        {Object.entries(toolCategories).map(([key, category]) => (
                            <div key={key}>
                                <div className="font-semibold text-white mb-3 flex items-center gap-2 text-lg">
                                    <span className="text-xl">{category.icon}</span>
                                    <span>{category.name}</span>
                                </div>
                                <div className="grid grid-cols-1 gap-1 pl-4 border-l border-white/10">
                                    {category.tools.map((tool) => (
                                        <Link
                                            key={tool.href}
                                            href={tool.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="flex items-center gap-3 py-3 px-3 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
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
