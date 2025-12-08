'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Starfield from '@/components/ui/Starfield';
import LogoMarquee from '@/components/ui/LogoMarquee';
import { useState, useEffect } from 'react';

const featuredTools = [
  {
    name: 'PDF to Word',
    href: '/pdf-to-word',
    icon: '📝',
    desc: 'Transform PDFs into fully editable Word documents while preserving formatting.',
    color: 'text-blue-500'
  },
  {
    name: 'Merge PDF',
    href: '/merge-pdf',
    icon: '🖇️',
    desc: 'Combine multiple PDF files into a single document with perfect page ordering.',
    color: 'text-purple-500'
  },
  {
    name: 'Compress PDF',
    href: '/compress-pdf',
    icon: '🗜️',
    desc: 'Reduce PDF file size up to 90% without compromising visual quality.',
    color: 'text-green-500'
  },
  {
    name: 'Protect PDF',
    href: '/protect-pdf',
    icon: '🔐',
    desc: 'Secure your PDFs with 256-bit AES encryption and password protection.',
    color: 'text-red-500'
  },
];

const capabilities = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Industry-leading conversion speed powered by optimized algorithms.'
  },
  {
    icon: '🔒',
    title: 'Bank-Level Security',
    description: 'End-to-end encryption. Your data never touches our servers.'
  },
  {
    icon: '💎',
    title: 'Premium Quality',
    description: 'Maintain perfect formatting, fonts, and images across all conversions.'
  },
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredTools = selectedCategory === 'All'
    ? allTools
    : allTools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] overflow-hidden selection:bg-blue-500/30">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050505] to-[#050505]" />
          <div className="absolute inset-0 bg-noise opacity-20 pointer-events-none mix-blend-overlay" />
          <Starfield />

          <div
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-blob mix-blend-screen transition-transform duration-100 ease-out"
            style={{ transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)` }}
          />
          <div
            className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen transition-transform duration-100 ease-out"
            style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" />

          <div className="container relative mx-auto px-4 text-center z-10 mb-20">
            <div className="max-w-5xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-sm font-medium text-zinc-300">
                  v2.0 Now Available
                </span>
              </div>

              {/* Hero Title */}
              <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-tight tracking-tight animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
                Master Your
                <span className="block mt-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                  Digital Documents
                </span>
              </h1>

              {/* Hero Description */}
              <p className="text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed max-w-3xl mx-auto font-medium animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
                The most advanced PDF toolset on the web. Convert, edit, and secure your files with enterprise-grade speed and privacy.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-6 mb-20 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
                <Button href="/pdf-to-word" size="lg" className="shadow-blue-500/25 shadow-lg">
                  Start Converting
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Button>
                <Button href="#tools" variant="secondary" size="lg">
                  Explore Tools
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s' }}>
                {[
                  { value: '30+', label: 'Tools' },
                  { value: '100%', label: 'Free' },
                  { value: '0s', label: 'Wait Time' },
                  { value: '256-bit', label: 'Secure' }
                ].map((stat, index) => (
                  <div key={index} className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                    <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <LogoMarquee />
        </section>

        {/* Capabilities Section */}
        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {capabilities.map((cap, index) => (
                <Card key={index} className="bg-gradient-to-b from-white/5 to-transparent">
                  <div className="text-4xl mb-6">{cap.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{cap.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{cap.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Tools */}
        <section className="py-32 bg-[#0a0a0a]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Popular Tools</h2>
              <p className="text-zinc-400 text-lg">Most used tools by our community</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredTools.map((tool, index) => (
                <Link key={index} href={tool.href}>
                  <Card className="h-full hover:bg-white/5">
                    <div className="text-4xl mb-6">{tool.icon}</div>
                    <h3 className={`text-xl font-bold mb-3 ${tool.color}`}>{tool.name}</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">{tool.desc}</p>
                    <div className="flex items-center text-sm font-medium text-white group-hover:gap-2 transition-all">
                      Try Now <span className="ml-1">→</span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Tools Section */}
        <section id="tools" className="py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Complete Toolkit</h2>

              {/* Category Filters */}
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                      ? 'bg-white text-black'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredTools.map((tool, index) => (
                <Link key={index} href={tool.href}>
                  <Card className="text-center p-6 h-full flex flex-col items-center justify-center gap-4 hover:bg-white/5">
                    <div className="text-3xl">{tool.icon}</div>
                    <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                      {tool.name}
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
              Ready to get started?
            </h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
              Join thousands of users who trust DosiBridge for their document needs.
            </p>
            <Button href="/pdf-to-word" size="lg" className="bg-white text-black hover:bg-blue-50">
              Start Converting Free
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
