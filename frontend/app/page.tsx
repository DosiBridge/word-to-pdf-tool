'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

const featuredTools = [
  { name: 'PDF to Word', href: '/pdf-to-word', icon: '📝', desc: 'Convert PDF to editable Word documents', color: 'blue' },
  { name: 'Merge PDF', href: '/merge-pdf', icon: '🖇️', desc: 'Combine multiple PDFs into one', color: 'purple' },
  { name: 'Compress PDF', href: '/compress-pdf', icon: '🗜️', desc: 'Reduce PDF file size', color: 'green' },
  { name: 'Protect PDF', href: '/protect-pdf', icon: '🔐', desc: 'Add password protection', color: 'red' },
];

const allTools = [
  { name: 'PDF to Word', href: '/pdf-to-word', icon: '📝', category: 'Convert' },
  { name: 'Word to PDF', href: '/word-to-pdf', icon: '📄', category: 'Convert' },
  { name: 'PDF to Excel', href: '/pdf-to-excel', icon: '📈', category: 'Convert' },
  { name: 'Excel to PDF', href: '/excel-to-pdf', icon: '📊', category: 'Convert' },
  { name: 'PDF to PowerPoint', href: '/pdf-to-powerpoint', icon: '📊', category: 'Convert' },
  { name: 'PowerPoint to PDF', href: '/powerpoint-to-pdf', icon: '📽️', category: 'Convert' },
  { name: 'PDF to JPG', href: '/pdf-to-jpg', icon: '🖼️', category: 'Convert' },
  { name: 'JPG to PDF', href: '/jpg-to-pdf', icon: '📷', category: 'Convert' },
  { name: 'Merge PDF', href: '/merge-pdf', icon: '🖇️', category: 'Organize' },
  { name: 'Split PDF', href: '/split-pdf', icon: '✂️', category: 'Organize' },
  { name: 'Compress PDF', href: '/compress-pdf', icon: '🗜️', category: 'Edit' },
  { name: 'Rotate PDF', href: '/rotate-pdf', icon: '🔄', category: 'Edit' },
  { name: 'Extract Pages', href: '/extract-pages', icon: '📑', category: 'Organize' },
  { name: 'Remove Pages', href: '/remove-pages', icon: '🗑️', category: 'Organize' },
  { name: 'Organize PDF', href: '/organize-pdf', icon: '📋', category: 'Organize' },
  { name: 'Crop PDF', href: '/crop-pdf', icon: '✂️', category: 'Edit' },
  { name: 'Add Watermark', href: '/add-watermark', icon: '💧', category: 'Edit' },
  { name: 'Add Page Numbers', href: '/add-page-numbers', icon: '🔢', category: 'Edit' },
  { name: 'Protect PDF', href: '/protect-pdf', icon: '🔐', category: 'Secure' },
  { name: 'Unlock PDF', href: '/unlock-pdf', icon: '🔓', category: 'Secure' },
  { name: 'Sign PDF', href: '/sign-pdf', icon: '✒️', category: 'Secure' },
  { name: 'Redact PDF', href: '/redact-pdf', icon: '▓', category: 'Secure' },
  { name: 'OCR PDF', href: '/ocr-pdf', icon: '👁️', category: 'Advanced' },
  { name: 'Repair PDF', href: '/repair-pdf', icon: '🔧', category: 'Advanced' },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Convert', 'Organize', 'Edit', 'Secure', 'Advanced'];

  const filteredTools = selectedCategory === 'All'
    ? allTools
    : allTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-zinc-900 dark:via-blue-950 dark:to-purple-950">
          <div className="absolute inset-0 bg-grid-zinc-900/[0.02] dark:bg-grid-zinc-100/[0.02]" />
          <div className="container relative mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Documents Instantly
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-300 mb-10 leading-relaxed">
                Professional PDF tools for everyone. Convert, edit, merge, and secure your documents in seconds. <span className="font-semibold text-zinc-900 dark:text-zinc-100">100% Free. No registration required.</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Link
                  href="/pdf-to-word"
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg"
                >
                  Start Converting Free →
                </Link>
                <a
                  href="#tools"
                  className="px-8 py-4 bg-white/80 dark:bg-zinc-800/80 backdrop-blur hover:bg-white dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 font-semibold rounded-xl transition-all text-lg"
                >
                  Explore 30+ Tools
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">30+</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">PDF Tools</div>
                </div>
                <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Free</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">Forever</div>
                </div>
                <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Secure</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">Privacy</div>
                </div>
                <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                  <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Fast</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">Processing</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tools */}
        <section className="py-20 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                Most Popular Tools
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Start with these frequently used tools to convert and manage your PDFs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {featuredTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group relative p-6 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">{tool.icon}</div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {tool.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Tools Section */}
        <section id="tools" className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                All Tools at Your Fingertips
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-8">
                Browse all 30+ professional tools organized by category
              </p>

              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === category
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-blue-50 dark:hover:bg-zinc-700'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group p-4 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all text-center"
                >
                  <div className="text-3xl mb-2 transform group-hover:scale-110 transition-transform">{tool.icon}</div>
                  <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white dark:bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                How It Works
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Simple 3-step process to convert or edit your documents
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">1. Upload File</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Select or drag and drop your PDF or document file
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">2. Process</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Our servers securely convert your file in seconds
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">3. Download</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Get your converted file instantly, ready to use
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
                Why Choose DosiBridge?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-5">
                  <span className="text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Lightning Fast</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Process documents in seconds with our optimized conversion engine. No waiting, no delays.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-5">
                  <span className="text-3xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">100% Secure</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Your files are encrypted and automatically deleted after processing. We never store your data.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-5">
                  <span className="text-3xl">💎</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Premium Quality</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Maintain perfect formatting and layout across all conversions with professional-grade tools.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="w-14 h-14 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl flex items-center justify-center mb-5">
                  <span className="text-3xl">🌐</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Works Everywhere</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Access from any device - desktop, tablet, or mobile. No installation required.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center mb-5">
                  <span className="text-3xl">∞</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Unlimited Use</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  No limits on file size or conversions. Process as many documents as you need.
                </p>
              </div>
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                <div className="w-14 h-14 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-5">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">No Registration</h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Start converting immediately. No account creation, no email verification needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Documents?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust DosiBridge for their document conversion needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/pdf-to-word"
                className="px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-semibold rounded-xl transition-all shadow-lg text-lg"
              >
                Start Converting Free
              </Link>
              <Link
                href="#tools"
                className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold rounded-xl transition-all text-lg"
              >
                View All Tools
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
