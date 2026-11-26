import Link from 'next/link'
import { formatTextDate, type Text } from '@/lib/texts'

export function TextRow({ text }: { text: Text }) {
  return (
    <Link
      href={text.href}
      className="group flex items-baseline justify-between gap-6 py-4 border-b border-border"
    >
      <span className="text-[16px] sm:text-[17px] leading-[1.4] text-foreground-muted group-hover:text-foreground transition-colors duration-200">
        {text.title}
      </span>
      <time
        dateTime={text.date}
        className="shrink-0 font-mono text-[12px] text-foreground-subtle tabular-nums group-hover:text-accent-ink transition-colors duration-200"
      >
        {formatTextDate(text.date)}
      </time>
    </Link>
  )
}
