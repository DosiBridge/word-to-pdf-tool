// Use environment variable or default to localhost for browser requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ConversionResponse {
  success: boolean;
  error?: string;
}

export async function convertPdfToWord(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/pdf-to-word`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Conversion failed' }));
    throw new Error(error.detail || 'Conversion failed');
  }

  return await response.blob();
}

export async function convertWordToPdf(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/word-to-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Conversion failed' }));
    throw new Error(error.detail || 'Conversion failed');
  }

  return await response.blob();
}

export async function convertPdfToTxt(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/pdf-to-txt`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Conversion failed' }));
    throw new Error(error.detail || 'Conversion failed');
  }

  return await response.blob();
}

export const unlockPdf = async (file: File, password?: string): Promise<Blob> => {
  const formData = new FormData();
  formData.append('file', file);
  if (password) {
    formData.append('password', password);
  }

  const response = await fetch(`${API_BASE_URL}/api/pdf-unlock`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Unlocking failed');
  }

  return response.blob();
};

export const mergePdfs = async (files: File[]): Promise<Blob> => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await fetch(`${API_BASE_URL}/api/merge-pdfs`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Merge failed');
  }

  return response.blob();
};

export const splitPdf = async (file: File, pages: string): Promise<Blob> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('pages', pages);

  const response = await fetch(`${API_BASE_URL}/api/split-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Split failed');
  }

  return response.blob();
};

export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export async function convertUnicodeToBijoy(text: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/unicode-to-bijoy`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Conversion failed' }));
    throw new Error(error.detail || 'Conversion failed');
  }

  const data = await response.json();
  return data.converted_text;
}

export async function convertBijoyToUnicode(text: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/bijoy-to-unicode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Conversion failed' }));
    throw new Error(error.detail || 'Conversion failed');
  }

  const data = await response.json();
  return data.converted_text;
}

// ============================================
// PHASE 1: CORE PDF TOOLS
// ============================================

export async function compressPdf(file: File, quality: string = 'medium'): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('quality', quality);

  const response = await fetch(`${API_BASE_URL}/api/compress-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Compression failed' }));
    throw new Error(error.detail || 'Compression failed');
  }

  return await response.blob();
}

export async function rotatePdf(file: File, rotation: number = 90, pages: string = 'all'): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('rotation', rotation.toString());
  formData.append('pages', pages);

  const response = await fetch(`${API_BASE_URL}/api/rotate-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Rotation failed' }));
    throw new Error(error.detail || 'Rotation failed');
  }

  return await response.blob();
}

export async function pdfToJpg(file: File, dpi: number = 150, pages: string = 'all'): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('dpi', dpi.toString());
  formData.append('pages', pages);

  const response = await fetch(`${API_BASE_URL}/api/pdf-to-jpg`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Conversion failed' }));
    throw new Error(error.detail || 'Conversion failed');
  }

  return await response.blob();
}

export async function jpgToPdf(files: File[]): Promise<Blob> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await fetch(`${API_BASE_URL}/api/jpg-to-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Conversion failed' }));
    throw new Error(error.detail || 'Conversion failed');
  }

  return await response.blob();
}

export async function addPageNumbers(
  file: File,
  position: string = 'bottom-center',
  format: string = 'Page {n} of {total}',
  startPage: number = 1,
  fontSize: number = 12
): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('position', position);
  formData.append('format', format);
  formData.append('start_page', startPage.toString());
  formData.append('font_size', fontSize.toString());

  const response = await fetch(`${API_BASE_URL}/api/add-page-numbers`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Operation failed' }));
    throw new Error(error.detail || 'Operation failed');
  }

  return await response.blob();
}

export async function addWatermark(
  file: File,
  text: string,
  opacity: number = 0.3,
  rotation: number = 45,
  fontSize: number = 60,
  color: string = 'gray'
): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('text', text);
  formData.append('opacity', opacity.toString());
  formData.append('rotation', rotation.toString());
  formData.append('font_size', fontSize.toString());
  formData.append('color', color);

  const response = await fetch(`${API_BASE_URL}/api/add-watermark`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Operation failed' }));
    throw new Error(error.detail || 'Operation failed');
  }

  return await response.blob();
}

export async function protectPdf(
  file: File,
  userPassword: string,
  ownerPassword?: string,
  allowPrinting: boolean = true,
  allowCopying: boolean = false
): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('user_password', userPassword);
  if (ownerPassword) {
    formData.append('owner_password', ownerPassword);
  }
  formData.append('allow_printing', allowPrinting.toString());
  formData.append('allow_copying', allowCopying.toString());

  const response = await fetch(`${API_BASE_URL}/api/protect-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Protection failed' }));
    throw new Error(error.detail || 'Protection failed');
  }

  return await response.blob();
}

// ============================================
// PHASE 2: DOCUMENT CONVERSIONS
// ============================================

export async function excelToPdf(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/excel-to-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Conversion failed' }));
    throw new Error(error.detail || 'Conversion failed');
  }

  return await response.blob();
}

export async function pptxToPdf(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/pptx-to-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Conversion failed' }));
    throw new Error(error.detail || 'Conversion failed');
  }

  return await response.blob();
}

export async function htmlToPdf(file?: File, htmlContent?: string): Promise<Blob> {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);
  }
  if (htmlContent) {
    formData.append('html_content', htmlContent);
  }

  const response = await fetch(`${API_BASE_URL}/api/html-to-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Conversion failed' }));
    throw new Error(error.detail || 'Conversion failed');
  }

  return await response.blob();
}

export async function pdfToExcel(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/pdf-to-excel`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Conversion failed' }));
    throw new Error(error.detail || 'Conversion failed');
  }

  return await response.blob();
}

export async function pdfToPptx(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/pdf-to-pptx`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Conversion failed' }));
    throw new Error(error.detail || 'Conversion failed');
  }

  return await response.blob();
}

// ============================================
// PHASE 3: PAGE ORGANIZATION TOOLS
// ============================================

export async function extractPages(file: File, pages: string): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('pages', pages);

  const response = await fetch(`${API_BASE_URL}/api/extract-pages`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Extraction failed' }));
    throw new Error(error.detail || 'Extraction failed');
  }

  return await response.blob();
}

export async function removePages(file: File, pages: string): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('pages', pages);

  const response = await fetch(`${API_BASE_URL}/api/remove-pages`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Removal failed' }));
    throw new Error(error.detail || 'Removal failed');
  }

  return await response.blob();
}

export async function organizePdf(file: File, order: string): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('order', order);

  const response = await fetch(`${API_BASE_URL}/api/organize-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Organization failed' }));
    throw new Error(error.detail || 'Organization failed');
  }

  return await response.blob();
}

export async function cropPdf(
  file: File,
  top: number = 0,
  bottom: number = 0,
  left: number = 0,
  right: number = 0
): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('top', top.toString());
  formData.append('bottom', bottom.toString());
  formData.append('left', left.toString());
  formData.append('right', right.toString());

  const response = await fetch(`${API_BASE_URL}/api/crop-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Cropping failed' }));
    throw new Error(error.detail || 'Cropping failed');
  }

  return await response.blob();
}

// ============================================
// PHASE 4: ADVANCED FEATURES
// ============================================

export async function ocrPdf(file: File, language: string = 'eng'): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('language', language);

  const response = await fetch(`${API_BASE_URL}/api/ocr-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'OCR failed' }));
    throw new Error(error.detail || 'OCR failed');
  }

  return await response.blob();
}

export async function repairPdf(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/repair-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Repair failed' }));
    throw new Error(error.detail || 'Repair failed');
  }

  return await response.blob();
}

export async function pdfToPdfa(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/pdf-to-pdfa`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Conversion failed' }));
    throw new Error(error.detail || 'Conversion failed');
  }

  return await response.blob();
}

export async function signPdf(
  file: File,
  signatureText: string,
  signerName: string = '',
  position: string = 'bottom-right',
  page: number = -1
): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('signature_text', signatureText);
  formData.append('signer_name', signerName);
  formData.append('position', position);
  formData.append('page', page.toString());

  const response = await fetch(`${API_BASE_URL}/api/sign-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Signing failed' }));
    throw new Error(error.detail || 'Signing failed');
  }

  return await response.blob();
}

export async function redactPdf(
  file: File,
  searchText: string,
  replacement: string = '[REDACTED]'
): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('search_text', searchText);
  formData.append('replacement', replacement);

  const response = await fetch(`${API_BASE_URL}/api/redact-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Redaction failed' }));
    throw new Error(error.detail || 'Redaction failed');
  }

  return await response.blob();
}

export async function comparePdfs(files: File[]): Promise<Blob> {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await fetch(`${API_BASE_URL}/api/compare-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Comparison failed' }));
    throw new Error(error.detail || 'Comparison failed');
  }

  return await response.blob();
}
