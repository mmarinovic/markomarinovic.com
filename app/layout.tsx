import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Nav } from '@/components/layout/nav'
import { Footer } from '@/components/layout/footer'
import { GradientField } from '@/components/layout/gradient-field'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { themeInitScript } from '@/lib/theme'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
  ],
}

const geist = Geist({ subsets: ['latin', 'latin-ext'], variable: '--font-geist-sans' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`${geist.variable} ${geistMono.variable} font-sans bg-background text-foreground-muted antialiased`}>
        <GradientField />
        <ThemeProvider>
          <div className="relative z-1">
            <Nav />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-XGZYMZ7Y1J" />
    </html>
  )
}
