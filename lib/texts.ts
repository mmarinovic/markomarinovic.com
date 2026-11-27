import fs from 'node:fs/promises'
import path from 'node:path'
import { cache } from 'react'
import matter from 'gray-matter'
import { texts } from '@/texts'

export type TextTrack = 'money' | 'ai' | 'craft' | 'onchain' | 'personal'

export interface Text {
  title: string
  date: string
  description: string
  href: `/texts/${string}`
  track: TextTrack
  work?: boolean
  draft?: boolean
  /** Share image for this text; falls back to the site's /og.jpg. */
  image?: `/${string}`
}

export const trackLabels: Record<TextTrack, string> = {
  money: 'Money systems',
  ai: 'AI systems',
  craft: 'Craft',
  onchain: 'Tokens and NFTs',
  personal: 'Personal',
}

const isVisible = (text: Text) => !text.draft || process.env.NODE_ENV === 'development'

const publishedAt = (date: string) => {
  const [year = 0, month = 1, day = 1] = date.split('-').map(Number)
  return Date.UTC(year, month - 1, day)
}

export const publishedTexts = texts
  .filter(isVisible)
  .toSorted((a, b) => publishedAt(b.date) - publishedAt(a.date))

export const listedTexts = publishedTexts.filter((text) => !text.work)

export const textSlug = (text: Text) => text.href.slice('/texts/'.length)

const monthYear = new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric', timeZone: 'UTC' })

export function formatTextDate(date: string): string {
  const [year, month] = date.split('-').map(Number)
  return year && month ? monthYear.format(Date.UTC(year, month - 1)) : date
}

const asString = (value: unknown) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : value == null ? '' : String(value)

export const getText = cache(async (slug: string) => {
  const entry = publishedTexts.find((text) => textSlug(text) === slug)
  if (!entry) return null
  const file = await fs.readFile(path.join(process.cwd(), 'texts', `${slug}.md`), 'utf8')
  const { data, content } = matter(file)
  return {
    title: asString(data.title) || entry.title,
    date: asString(data.date) || entry.date,
    description: asString(data.description) || entry.description,
    externalUrl: asString(data.externalUrl) || undefined,
    label: trackLabels[entry.track],
    image: entry.image,
    body: content,
  }
})
