import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://converter.dosibridge.com'

  const routes = [
    '',
    '/pdf-to-word',
    '/word-to-pdf',
    '/pdf-to-excel',
    '/excel-to-pdf',
    '/pdf-to-powerpoint',
    '/powerpoint-to-pdf',
    '/pdf-to-jpg',
    '/jpg-to-pdf',
    '/merge-pdf',
    '/split-pdf',
    '/compress-pdf',
    '/rotate-pdf',
    '/extract-pages',
    '/remove-pages',
    '/organize-pdf',
    '/crop-pdf',
    '/add-watermark',
    '/add-page-numbers',
    '/protect-pdf',
    '/unlock-pdf',
    '/sign-pdf',
    '/redact-pdf',
    '/ocr-pdf',
    '/repair-pdf',
    '/html-to-pdf',
    '/pdf-to-pdfa',
    '/pdf-to-text',
    '/compare-pdf',
    '/unicode-to-bijoy',
    '/bijoy-to-unicode'
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
