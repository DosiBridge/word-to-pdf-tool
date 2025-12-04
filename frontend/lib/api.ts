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
