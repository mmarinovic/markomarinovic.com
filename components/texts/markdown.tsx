import { readFileSync } from 'node:fs'
import path from 'node:path'
import Image from 'next/image'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

const publicRoot = path.resolve(process.cwd(), 'public')

function localPngSize(src: string): { width: number; height: number } | null {
  if (!src.startsWith('/')) return null
  const file = path.resolve(publicRoot, src.slice(1))
  if (!file.startsWith(publicRoot + path.sep)) return null
  try {
    const buf = readFileSync(file)
    if (buf.length < 24 || buf.readUInt32BE(0) !== 0x89504e47) return null
    const width = buf.readUInt32BE(16)
    const height = buf.readUInt32BE(20)
    return width && height ? { width, height } : null
  } catch {
    return null
  }
}

const frame = 'w-full h-auto rounded-xl border border-border'

const components: Components = {
  h1: ({ node, children, ...props }) => (
    <h1 className="text-[28px] sm:text-[32px] leading-[1.15] font-semibold tracking-[-0.03em] mt-[1.8em] mb-[0.5em] text-foreground" {...props}>
      {children}
    </h1>
  ),
  h2: ({ node, children, ...props }) => (
    <h2 className="text-[22px] sm:text-[24px] leading-[1.25] font-semibold tracking-[-0.025em] mt-[1.9em] mb-[0.5em] text-foreground" {...props}>
      {children}
    </h2>
  ),
  h3: ({ node, children, ...props }) => (
    <h3 className="text-[18px] sm:text-[19px] leading-[1.3] font-semibold tracking-[-0.015em] mt-[1.6em] mb-[0.4em] text-foreground" {...props}>
      {children}
    </h3>
  ),
  p: ({ node, children, ...props }) => {
    const parts = (node?.children ?? []).filter(
      (child) => !(child.type === 'text' && !child.value.trim()),
    )
    const [only] = parts
    if (parts.length === 1 && only.type === 'element' && only.tagName === 'img') {
      return <>{children}</>
    }
    return (
      <p className="text-foreground-muted my-[1.1em]" {...props}>
        {children}
      </p>
    )
  },
  a: ({ node, children, ...props }) => (
    <a className="link-prose" {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  img: ({ src, alt }) => {
    const source = typeof src === 'string' ? src : ''
    const altText = alt ?? ''
    const size = source ? localPngSize(source) : null
    return (
      <div className="my-10">
        {size ? (
          <Image
            src={source}
            alt={altText}
            width={size.width}
            height={size.height}
            sizes="(min-width: 720px) 680px, 100vw"
            className={frame}
          />
        ) : (
          <Image src={source} alt={altText} width={0} height={0} unoptimized className={frame} />
        )}
      </div>
    )
  },
  ul: ({ node, ...props }) => (
    <ul className="list-disc text-foreground-muted pl-6 my-[1.05em] space-y-2 marker:text-foreground-subtle" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="list-decimal text-foreground-muted pl-6 my-[1.05em] space-y-2 marker:text-foreground-subtle" {...props} />
  ),
  li: ({ node, ...props }) => <li className="text-foreground-muted" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote className="border-l-2 border-accent-ink text-foreground pl-5 my-[1.6em]" {...props} />
  ),
  pre: ({ node, children, ...props }) => (
    <div className="code-block my-[1.6em] overflow-hidden rounded-xl bg-code-bg border border-border">
      <pre className="p-4 sm:py-[18px] sm:px-5 overflow-x-auto">
        <code
          className="block font-mono text-[12.5px] sm:text-[13.5px] leading-[1.65] text-code-text whitespace-pre"
          {...props}
        >
          {children}
        </code>
      </pre>
    </div>
  ),
  code: ({ node, ...props }) => <code className="code-inline" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
  hr: ({ node, ...props }) => <hr className="border-border my-14" {...props} />,
  table: ({ node, ...props }) => (
    <div className="my-9 overflow-x-auto">
      <table className="w-full text-[15px] sm:text-[16px] leading-[1.45] border-collapse" {...props} />
    </div>
  ),
  th: ({ node, ...props }) => (
    <th
      className="text-left font-mono text-[11px] font-normal uppercase tracking-[0.08em] text-foreground-subtle py-3 pr-6 last:pr-0 border-b border-border whitespace-nowrap"
      {...props}
    />
  ),
  td: ({ node, ...props }) => (
    <td className="py-3 pr-6 last:pr-0 text-foreground-muted border-b border-border align-top" {...props} />
  ),
}

export function Markdown({ children }: { children: string }) {
  return (
    <div className="text-[17px] leading-[1.7] sm:text-[18px] [&>:first-child]:mt-0">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
