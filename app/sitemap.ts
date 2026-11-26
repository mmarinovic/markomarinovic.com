import type { MetadataRoute } from 'next'
import { publishedTexts } from '@/lib/texts'
import { siteUrl } from '@/lib/site'

type Entry = MetadataRoute.Sitemap[number]

const page = (
  path: string,
  changeFrequency: Entry['changeFrequency'],
  priority: number,
): Entry => ({ url: `${siteUrl}${path}`, lastModified: new Date(), changeFrequency, priority })

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page('', 'monthly', 1),
    page('/work', 'monthly', 0.8),
    page('/texts', 'weekly', 0.9),
    ...publishedTexts.map((text) => page(text.href, 'monthly', 0.7)),
  ]
}
