import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex flex-col">
                    <span className="text-xl font-bold text-blue-600 dark:text-blue-400">Converter</span>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium">Powered by DosiBridge</span>
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <Link href="/pdf-to-word" className="text-sm font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                        PDF to Word
                    </Link>
                    <Link href="/word-to-pdf" className="text-sm font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                        Word to PDF
                    </Link>
                    <Link href="/merge-pdf" className="text-sm font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                        Merge PDF
                    </Link>
                    <Link href="/split-pdf" className="text-sm font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                        Split PDF
                    </Link>
                    <Link href="/pdf-to-text" className="text-sm font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                        PDF to Text
                    </Link>
                    <Link href="/unlock-pdf" className="text-sm font-medium text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors">
                        Unlock PDF
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <a href="https://dosibridge.com" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                        dosibridge.com
                    </a>
                </div>
            </div>
        </nav>
    );
}
