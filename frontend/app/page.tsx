'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-zinc-900 dark:to-zinc-950">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">
              Professional <span className="text-blue-600 dark:text-blue-500">Converter</span> Tools
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
              Powered by DosiBridge. Convert, edit, and manage your documents with professional-grade tools. Fast, secure, and easy to use.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/pdf-to-word" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-lg">
                Get Started
              </Link>
              <a href="#tools" className="px-8 py-4 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 font-semibold rounded-lg transition-colors text-lg">
                Explore Tools
              </a>
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section id="tools" className="py-20 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                Popular Tools
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Everything you need to manage your documents efficiently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ToolCard
                title="PDF to Word"
                description="Convert PDF documents to editable Word files."
                href="/pdf-to-word"
                icon="📝"
              />
              <ToolCard
                title="Word to PDF"
                description="Create professional PDF documents from Word files."
                href="/word-to-pdf"
                icon="📄"
              />
              <ToolCard
                title="Merge PDF"
                description="Combine multiple PDF files into one document."
                href="/merge-pdf"
                icon="🖇️"
              />
              <ToolCard
                title="Split PDF"
                description="Extract pages from your PDF files."
                href="/split-pdf"
                icon="✂️"
              />
              <ToolCard
                title="PDF to Text"
                description="Extract text content from your PDF files instantly."
                href="/pdf-to-text"
                icon="✍️"
              />
              <ToolCard
                title="Unlock PDF"
                description="Remove password protection from your PDF files."
                href="/unlock-pdf"
                icon="🔓"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Fast Conversion</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Process your documents in seconds with our optimized conversion engine.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Secure & Private</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Your files are processed securely and automatically deleted after conversion.
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">💎</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">High Quality</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Maintain formatting and layout integrity across all your document conversions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ToolCard({ title, description, href, icon }: { title: string; description: string; href: string; icon: string }) {
  return (
    <Link href={href} className="group p-6 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300">
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-zinc-600 dark:text-zinc-400 text-sm">
        {description}
      </p>
    </Link>
  );
}
