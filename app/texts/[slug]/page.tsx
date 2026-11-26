import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatTextDate, getText, publishedTexts, textSlug } from '@/lib/texts'
import { author } from '@/lib/site'
import { Page } from '@/components/ui/page'
import { Markdown } from '@/components/texts/markdown'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return publishedTexts.map((text) => ({ slug: textSlug(text) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const text = await getText(slug)
  if (!text) return {}
  const title = `${text.title} | ${author}`
  return {
    title,
    description: text.description,
    alternates: { canonical: `/texts/${slug}` },
    openGraph: {
      title,
      description: text.description,
      type: 'article',
      authors: [author],
      publishedTime: text.date,
      images: ['/og.jpg'],
    },
  }
}

const footerLink =
  'inline-flex items-center min-h-[44px] font-mono text-[12px] transition-colors duration-200'

export default async function TextPage({ params }: Props) {
  const text = await getText((await params).slug)
  if (!text) notFound()

  return (
    <Page narrow>
      <article>
        <header className="mb-12">
          <p className="label">{text.label}</p>
          <h1 className="mt-4 text-[34px] sm:text-[48px] font-semibold leading-[1.08] tracking-[-0.035em] text-foreground">
            {text.title}
          </h1>
          <time
            dateTime={text.date}
            className="mt-5 block font-mono text-[12px] text-foreground-subtle tabular-nums"
          >
            {formatTextDate(text.date)}
          </time>
        </header>

        <Markdown>{text.body}</Markdown>

        {text.externalUrl && (
          <div className="mt-11 pt-3 border-t border-border">
            <a
              href={text.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${footerLink} gap-1.5 text-foreground hover:text-accent-ink`}
            >
              Read the full writeup
              <span aria-hidden="true">→</span>
            </a>
          </div>
        )}

        <div className="mt-11 pt-3 border-t border-border">
          <Link href="/texts" className={`${footerLink} text-foreground-subtle hover:text-foreground`}>
            ← All texts
          </Link>
        </div>
      </article>
    </Page>
  )
}
