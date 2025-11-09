'use client';

import FileConverter from '@/components/FileConverter';
import { convertPdfToTxt, convertPdfToWord, convertWordToPdf, unlockPdf } from '@/lib/api';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Document Converter
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Convert between PDF, Word, and text formats. Unlock password-protected PDFs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <FileConverter
            title="PDF to Word"
            description="Convert PDF documents to Word (.docx) format"
            accept=".pdf"
            onConvert={convertPdfToWord}
            outputExtension=".docx"
          />

          <FileConverter
            title="Word to PDF"
            description="Convert Word documents (.docx, .doc) to PDF format"
            accept=".doc,.docx"
            onConvert={convertWordToPdf}
            outputExtension=".pdf"
          />

          <FileConverter
            title="PDF to Text"
            description="Extract text content from PDF files"
            accept=".pdf"
            onConvert={convertPdfToTxt}
            outputExtension=".txt"
          />

          <FileConverter
            title="PDF Unlocker"
            description="Remove password protection from PDF files"
            accept=".pdf"
            onConvert={unlockPdf}
            outputExtension=".pdf"
            showPassword={true}
          />
        </div>

        <div className="mt-12 text-center text-sm text-zinc-500 dark:text-zinc-400">
          <p>All conversions are processed securely. Files are not stored on the server.</p>
        </div>
      </div>
    </div>
  );
}
