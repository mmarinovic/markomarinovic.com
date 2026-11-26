export function Page({
  children,
  narrow = false,
}: {
  children: React.ReactNode
  narrow?: boolean
}) {
  return (
    <div className="relative min-h-screen pt-32 sm:pt-40 pb-24 sm:pb-32 overflow-hidden">
      <div
        className={`dot-grid pointer-events-none absolute inset-x-0 top-0 ${narrow ? 'h-[420px]' : 'h-[520px]'}`}
        aria-hidden="true"
      />
      <div className={`relative mx-auto px-4 sm:px-6 ${narrow ? 'max-w-[680px]' : 'max-w-[720px]'}`}>
        {children}
      </div>
    </div>
  )
}

export function PageHeader({
  label,
  title,
  children,
}: {
  label: string
  title: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <header>
      <p className="label animate-fade-up">{label}</p>
      <h1 className="mt-4 text-[40px] sm:text-[56px] leading-[1.05] tracking-[-0.035em] font-semibold text-foreground animate-fade-up stagger-1">
        {title}
      </h1>
      {children && (
        <div className="mt-5 text-[17px] sm:text-[18px] leading-[1.6] max-w-[52ch] animate-fade-up stagger-2">
          {children}
        </div>
      )}
    </header>
  )
}

export function Section({
  label,
  children,
  aside,
}: {
  label: string
  children: React.ReactNode
  aside?: React.ReactNode
}) {
  return (
    <section className="mt-20 sm:mt-24">
      <div className="mb-5 flex items-baseline justify-between">
        <h2 className="label">{label}</h2>
        {aside}
      </div>
      {children}
    </section>
  )
}
