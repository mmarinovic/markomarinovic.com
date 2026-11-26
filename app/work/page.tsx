import type { Metadata } from 'next'
import { Page, PageHeader } from '@/components/ui/page'
import { ProjectCard } from '@/components/work/project-card'
import { author, projects } from '@/lib/site'

export const metadata: Metadata = {
  alternates: { canonical: '/work' },
  title: `Work | ${author}`,
  description:
    'Companies I work at, products I build, and open source: Blank, Lisk, Cicamica, Totebot, dobartek.hr, tailwindsql and React2AWS.',
}

export default function Work() {
  return (
    <Page>
      <PageHeader label="Work" title="Things I build.">
        <p>Companies, products and open source.</p>
      </PageHeader>

      <div className="mt-14 grid gap-3 sm:grid-cols-2">
        {projects.map((project, i) => (
          <div
            key={project.name}
            className="animate-fade-up"
            style={{ animationDelay: `${0.24 + i * 0.06}s` }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </Page>
  )
}
