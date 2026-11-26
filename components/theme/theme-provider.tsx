'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="gradient"
      enableSystem
      enableColorScheme={false}
      disableTransitionOnChange
      themes={['light', 'dark', 'gradient']}
    >
      {children}
    </NextThemesProvider>
  )
}
