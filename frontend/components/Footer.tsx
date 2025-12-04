import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1 block">
                            Converter
                        </Link>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500 mb-4">
                            Powered by DosiBridge
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs">
                            Professional document conversion tools for everyone. Secure, fast, and free to use.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Tools</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/pdf-to-word" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                                    PDF to Word
                                </Link>
                            </li>
                            <li>
                                <Link href="/word-to-pdf" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                                    Word to PDF
                                </Link>
                            </li>
                            <li>
                                <Link href="/pdf-to-text" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                                    PDF to Text
                                </Link>
                            </li>
                            <li>
                                <Link href="/unlock-pdf" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                                    Unlock PDF
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="https://dosibridge.com" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-zinc-200 dark:border-zinc-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                        © {new Date().getFullYear()} DosiBridge. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
