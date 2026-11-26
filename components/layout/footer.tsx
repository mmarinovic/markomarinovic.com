import { socials } from '@/lib/site'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 py-8 flex flex-wrap items-center justify-between gap-4 font-mono text-[12px] text-foreground-subtle">
        <span>© {year} Marko Marinovic</span>
        <div className="flex gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
