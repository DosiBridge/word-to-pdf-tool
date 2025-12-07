import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-900/50 dark:to-zinc-950 mt-auto">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                DosiBridge
                            </span>
                        </Link>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 max-w-sm">
                            Professional document conversion and PDF manipulation tools. Fast, secure, and completely free. Process your files without registration or email.
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-6 mb-6">
                            <div>
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">30+</div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-500">Tools</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">100%</div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-500">Free</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">Secure</div>
                                <div className="text-xs text-zinc-500 dark:text-zinc-500">Privacy</div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 flex items-center justify-center transition-colors"
                                aria-label="GitHub"
                            >
                                <svg className="w-5 h-5 text-zinc-700 dark:text-zinc-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 flex items-center justify-center transition-colors"
                                aria-label="Twitter"
                            >
                                <svg className="w-5 h-5 text-zinc-700 dark:text-zinc-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-zinc-200 dark:bg-zinc-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 flex items-center justify-center transition-colors"
                                aria-label="LinkedIn"
                            >
                                <svg className="w-5 h-5 text-zinc-700 dark:text-zinc-300" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* PDF Tools */}
                    <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Convert</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/pdf-to-word" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    PDF to Word
                                </Link>
                            </li>
                            <li>
                                <Link href="/word-to-pdf" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Word to PDF
                                </Link>
                            </li>
                            <li>
                                <Link href="/pdf-to-excel" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    PDF to Excel
                                </Link>
                            </li>
                            <li>
                                <Link href="/excel-to-pdf" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Excel to PDF
                                </Link>
                            </li>
                            <li>
                                <Link href="/pdf-to-jpg" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    PDF to JPG
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Organize Tools */}
                    <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Organize</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/merge-pdf" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Merge PDF
                                </Link>
                            </li>
                            <li>
                                <Link href="/split-pdf" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Split PDF
                                </Link>
                            </li>
                            <li>
                                <Link href="/compress-pdf" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Compress PDF
                                </Link>
                            </li>
                            <li>
                                <Link href="/organize-pdf" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Organize PDF
                                </Link>
                            </li>
                            <li>
                                <Link href="/rotate-pdf" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Rotate PDF
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Edit & Security */}
                    <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Edit & Secure</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/add-watermark" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Add Watermark
                                </Link>
                            </li>
                            <li>
                                <Link href="/add-page-numbers" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Add Page Numbers
                                </Link>
                            </li>
                            <li>
                                <Link href="/protect-pdf" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Protect PDF
                                </Link>
                            </li>
                            <li>
                                <Link href="/unlock-pdf" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Unlock PDF
                                </Link>
                            </li>
                            <li>
                                <Link href="/sign-pdf" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Sign PDF
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://dosibridge.com" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="https://dosibridge.com/blog" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="https://dosibridge.com/contact" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="max-w-md">
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">Stay Updated</h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                            Get the latest updates on new features and tools.
                        </p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 text-sm border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        © {currentYear} DosiBridge. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-500">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>100% Secure</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            <span>No Registration</span>
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                            </svg>
                            <span>Free Forever</span>
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
