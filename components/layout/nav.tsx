'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { navLinks } from '@/lib/site'

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-border bg-nav backdrop-blur-md">
      <div className="max-w-[720px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          aria-current={pathname === '/' ? 'page' : undefined}
          className="group inline-flex items-center gap-2.5 min-h-[44px] text-[15px] font-medium tracking-tight text-foreground"
        >
          <span
            aria-hidden="true"
            className="size-2 rounded-full bg-accent-ink shadow-[0_0_12px_var(--accent-ink)] transition-transform duration-300 group-hover:scale-125"
          />
          <span>
            Marko<span className="hidden sm:inline"> Marinovic</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex items-center min-h-[44px] px-2.5 sm:px-3 text-[14px] transition-colors duration-200 ${
                  active
                    ? 'text-foreground'
                    : 'text-foreground-subtle hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
