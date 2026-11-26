import type { Metadata } from 'next'
import { listedTexts } from '@/lib/texts'
import { author } from '@/lib/site'
import { Page, PageHeader } from '@/components/ui/page'
import { TextRow } from '@/components/texts/text-row'

const title = `Texts | ${author}`

export const metadata: Metadata = {
  title,
  description:
    'Texts on money systems, AI in production, and the craft of building software - ledgers, reconciliation, payment rails, and what agents cost to run.',
  alternates: { canonical: '/texts' },
  openGraph: { title, type: 'website', images: ['/og.jpg'] },
}

export default function Texts() {
  return (
    <Page>
      <PageHeader label="Writing" title="Texts">
        <p>On money systems, AI in production, and the craft of building software.</p>
      </PageHeader>

      <div className="mt-12 sm:mt-16 border-t border-border">
        {listedTexts.map((text, index) => (
          <div
            key={text.href}
            className="animate-fade-up"
            style={{ animationDelay: `${Math.min(index * 0.03, 0.24)}s` }}
          >
            <TextRow text={text} />
          </div>
        ))}
      </div>
    </Page>
  )
}
