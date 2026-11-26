import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { listedTexts } from '@/lib/texts'
import { timeline } from '@/lib/site'
import { Page, PageHeader, Section } from '@/components/ui/page'
import { TextRow } from '@/components/texts/text-row'

const title = 'Marko Marinović | Software engineer in fintech, AI and blockchain.'
const description =
  'Software engineer in fintech, AI and blockchain. CTO and co-founder of Blank, and staff engineer at Lisk.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: '/',
    type: 'website',
    images: ['/og.jpg'],
  },
}

export default function Home() {
  return (
    <Page>
      <div className="flex flex-col-reverse gap-8 sm:flex-row sm:items-end sm:justify-between">
        <PageHeader label="About" title="Marko Marinović" />
        <Image
          src="/avatar.webp"
          alt="Illustrated side profile of Marko Marinovic"
          width={1024}
          height={1024}
          priority
          unoptimized
          sizes="112px"
          className="size-20 sm:size-28 rounded-2xl object-cover animate-fade-up"
        />
      </div>

      <p className="mt-5 text-[17px] sm:text-[18px] leading-[1.6] max-w-[58ch] animate-fade-up stagger-2">
        Software engineer in <span className="terracotta">fintech</span>,{' '}
        <span className="terracotta">AI</span> and{' '}
        <span className="terracotta">blockchain</span>.
      </p>

      <div className="mt-8 space-y-5 text-[17px] sm:text-[18px] leading-[1.65] max-w-[58ch] animate-fade-up stagger-2">
        <p>
          I&apos;m CTO and co-founder of{' '}
          <a href="https://blankhq.co" target="_blank" rel="noopener noreferrer" className="link">
            Blank
          </a>
          . We build our own products and help companies ship AI-native fintech, from strategy to production.
        </p>
        <p>
          I started in crypto and most of what I build now is connected to
          fintech and AI.
        </p>
      </div>

      <Section label="Timeline">
        <ul className="list-disc space-y-3 pl-5 text-[17px] leading-[1.6] text-foreground-muted marker:text-foreground-subtle sm:text-[18px]">
          {timeline.map((item) => (
            <li key={item} className="max-w-[62ch] pl-1">
              {item}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        label="Latest texts"
        aside={
          <Link
            href="/texts"
            className="font-mono text-[12px] text-foreground-subtle hover:text-foreground transition-colors duration-200"
          >
            All texts →
          </Link>
        }
      >
        <div className="border-t border-border">
          {listedTexts.slice(0, 3).map((text) => (
            <TextRow key={text.href} text={text} />
          ))}
        </div>
      </Section>
    </Page>
  )
}
