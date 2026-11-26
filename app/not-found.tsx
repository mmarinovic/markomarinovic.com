import Link from 'next/link'
import { Page, PageHeader } from '@/components/ui/page'

export default function NotFound() {
  return (
    <Page>
      <PageHeader label="404" title="Page not found">
        <p>
          This page doesn&apos;t exist or was moved.{' '}
          <Link href="/" className="link">
            Go home
          </Link>
          .
        </p>
      </PageHeader>
    </Page>
  )
}
