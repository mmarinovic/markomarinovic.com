import { ArrowUpRight } from 'lucide-react'
import { sourceLabel, type Project } from '@/lib/site'
import { projectIcons } from '@/components/work/project-icons'

export function ProjectCard({ project }: { project: Project }) {
  const Icon = projectIcons[project.icon]

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col gap-5 rounded-2xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong hover:bg-surface-hover"
    >
      <div className="flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl border border-border-strong bg-background text-foreground transition-colors duration-300 group-hover:border-accent-ink group-hover:text-accent-ink">
          <Icon className="size-5" />
        </span>
        <ArrowUpRight
          className="size-4 text-foreground-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
          aria-hidden="true"
        />
      </div>
      <div>
        <h3 className="text-[16px] font-medium tracking-tight text-foreground">
          {project.name}
        </h3>
        <p className="mt-1 text-[14px] leading-[1.5] text-foreground-muted">
          {project.desc}
        </p>
      </div>
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em] text-foreground-subtle">
        <span>{project.tag}</span>
        {project.meta && (
          <>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{project.meta}</span>
          </>
        )}
      </div>
      <div className="mt-auto -mx-5 -mb-5 px-5 py-3 border-t border-border font-mono text-[11.5px] text-foreground-subtle truncate transition-colors duration-300 group-hover:text-accent-ink">
        {sourceLabel(project.href)}
      </div>
    </a>
  )
}
