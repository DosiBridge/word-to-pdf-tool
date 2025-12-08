import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/10 bg-[#050505] pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-block mb-6">
                            <span className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                DosiBridge
                            </span>
                        </Link>
                        <p className="text-zinc-400 mb-8 max-w-sm leading-relaxed">
                            Professional document conversion and PDF manipulation tools. Fast, secure, and completely free. Process your files without registration.
                        </p>

                        {/* Social/Stats */}
                        <div className="flex gap-4">
                            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/5">
                                <div className="text-xl font-bold text-white">30+</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider">Tools</div>
                            </div>
                            <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/5">
                                <div className="text-xl font-bold text-white">100%</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider">Free</div>
                            </div>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div>
                        <h3 className="font-bold text-white mb-6">Convert</h3>
                        <ul className="space-y-4">
                            <li><Link href="/pdf-to-word" className="text-zinc-400 hover:text-blue-400 transition-colors">PDF to Word</Link></li>
                            <li><Link href="/word-to-pdf" className="text-zinc-400 hover:text-blue-400 transition-colors">Word to PDF</Link></li>
                            <li><Link href="/pdf-to-excel" className="text-zinc-400 hover:text-blue-400 transition-colors">PDF to Excel</Link></li>
                            <li><Link href="/pdf-to-jpg" className="text-zinc-400 hover:text-blue-400 transition-colors">PDF to JPG</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-6">Organize</h3>
                        <ul className="space-y-4">
                            <li><Link href="/merge-pdf" className="text-zinc-400 hover:text-blue-400 transition-colors">Merge PDF</Link></li>
                            <li><Link href="/split-pdf" className="text-zinc-400 hover:text-blue-400 transition-colors">Split PDF</Link></li>
                            <li><Link href="/compress-pdf" className="text-zinc-400 hover:text-blue-400 transition-colors">Compress PDF</Link></li>
                            <li><Link href="/organize-pdf" className="text-zinc-400 hover:text-blue-400 transition-colors">Organize PDF</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-6">Edit & Secure</h3>
                        <ul className="space-y-4">
                            <li><Link href="/protect-pdf" className="text-zinc-400 hover:text-blue-400 transition-colors">Protect PDF</Link></li>
                            <li><Link href="/unlock-pdf" className="text-zinc-400 hover:text-blue-400 transition-colors">Unlock PDF</Link></li>
                            <li><Link href="/sign-pdf" className="text-zinc-400 hover:text-blue-400 transition-colors">Sign PDF</Link></li>
                            <li><Link href="/add-watermark" className="text-zinc-400 hover:text-blue-400 transition-colors">Add Watermark</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-white mb-6">Company</h3>
                        <ul className="space-y-4">
                            <li><a href="https://dosibridge.com" className="text-zinc-400 hover:text-blue-400 transition-colors">About Us</a></li>
                            <li><a href="#" className="text-zinc-400 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-zinc-400 hover:text-blue-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-zinc-400 hover:text-blue-400 transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-zinc-500 text-sm">
                        © {currentYear} DosiBridge. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-sm text-zinc-500">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            100% Secure
                        </span>
                        <span className="flex items-center gap-2 text-sm text-zinc-500">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            No Registration
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
