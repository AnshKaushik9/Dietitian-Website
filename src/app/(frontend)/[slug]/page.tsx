import { sanityFetch } from '@/sanity/lib/client'
import { genericPageQuery } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { PortableTextRenderer } from '@/components/shared/PortableTextRenderer'
import { SectionContainer } from '@/components/shared/SectionContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const page = await sanityFetch<any>({ 
    query: genericPageQuery, 
    params: { slug: resolvedParams.slug } 
  })
  
  if (!page) {
    return {}
  }

  return {
    title: page?.seo?.metaTitle || page.title,
    description: page?.seo?.metaDescription || 'Dietitian Services',
  }
}

export default async function GenericPage({ params }: Props) {
  const resolvedParams = await params
  const page = await sanityFetch<any>({ 
    query: genericPageQuery, 
    params: { slug: resolvedParams.slug } 
  })

  if (!page) {
    notFound()
  }

  return (
    <main className="flex-1">
      <SectionContainer className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <SectionHeading title={page.title} align="left" />
          <div className="mt-8 prose prose-lg dark:prose-invert max-w-none">
            {page.content ? (
              <PortableTextRenderer value={page.content} />
            ) : (
              <p>Content is being updated.</p>
            )}
          </div>
        </div>
      </SectionContainer>
    </main>
  )
}
