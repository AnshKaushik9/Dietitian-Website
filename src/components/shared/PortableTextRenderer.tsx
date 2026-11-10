import { PortableText, PortableTextComponents } from '@portabletext/react'
import { SanityImage } from './SanityImage'
import Link from 'next/link'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return (
        <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden bg-muted">
          <SanityImage image={value} alt={value.alt || 'Content Image'} fill className="object-cover" />
        </div>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
      const target = !value.href.startsWith('/') ? '_blank' : undefined
      return (
        <Link href={value.href} rel={rel} target={target} className="text-primary underline hover:no-underline">
          {children}
        </Link>
      )
    },
  },
}

export function PortableTextRenderer({ value }: { value: any }) {
  if (!value) return null
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary">
      <PortableText value={value} components={components} />
    </div>
  )
}
