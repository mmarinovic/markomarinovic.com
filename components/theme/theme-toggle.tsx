'use client'

import { useEffect, useSyncExternalStore } from 'react'
import { Moon, Sparkles, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

const order = ['light', 'dark', 'gradient'] as const
type ThemeName = (typeof order)[number]

const labels: Record<ThemeName, string> = {
  light: 'Color theme light. Switch to dark.',
  dark: 'Color theme dark. Switch to gradient.',
  gradient: 'Color theme gradient. Switch to light.',
}

function currentTheme(): ThemeName {
  const root = document.documentElement
  if (root.classList.contains('gradient')) return 'gradient'
  if (root.classList.contains('dark')) return 'dark'
  return 'light'
}

const subscribe = () => () => {}

function activeTheme(theme?: string, resolvedTheme?: string): ThemeName {
  if (theme === 'gradient') return 'gradient'
  if (theme === 'dark' || resolvedTheme === 'dark') return 'dark'
  if (theme === 'light' || resolvedTheme === 'light') return 'light'
  return currentTheme()
}

export function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  const active = mounted ? activeTheme(theme, resolvedTheme) : null
  const label = active ? labels[active] : 'Cycle color theme'

  useEffect(() => {
    if (active) document.documentElement.style.colorScheme = active === 'light' ? 'light' : 'dark'
  }, [active])

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        const current = currentTheme()
        const next = order[(order.indexOf(current) + 1) % order.length]
        setTheme(next)
        document.documentElement.style.colorScheme = next === 'light' ? 'light' : 'dark'
      }}
      className="ml-1 inline-flex size-11 items-center justify-center rounded-full text-foreground-subtle transition-colors duration-200 hover:text-foreground"
    >
      <Moon className="theme-icon theme-icon-moon size-4" aria-hidden="true" />
      <Sparkles className="theme-icon theme-icon-spark size-4" aria-hidden="true" />
      <Sun className="theme-icon theme-icon-sun size-4" aria-hidden="true" />
    </button>
  )
}
