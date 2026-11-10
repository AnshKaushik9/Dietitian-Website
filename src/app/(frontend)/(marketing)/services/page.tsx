import { sanityFetch } from '@/sanity/lib/client'
import { servicesPageQuery, allServicesQuery } from '@/sanity/lib/queries'
import { ServicesPageQueryResult, AllServicesQueryResult } from '../../../../../sanity.types'
import { notFound } from 'next/navigation'
import { SectionContainer } from '@/components/shared/SectionContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ServiceCard } from '@/components/shared/Cards'
import { CTABannerSection } from '@/components/sections/homepage/CTABannerSection'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<ServicesPageQueryResult>({ query: servicesPageQuery })
  return {
    title: page?.seo?.metaTitle || 'Services',
    description: page?.seo?.metaDescription || 'Explore our clinical nutrition services.',
  }
}

export default async function ServicesPage() {
  const page = await sanityFetch<ServicesPageQueryResult>({ query: servicesPageQuery })
  
  // We need to fetch all individual services for the grid
  const allServices = await sanityFetch<AllServicesQueryResult>({ query: allServicesQuery })

  if (!page) {
    notFound()
  }

  return (
    <main className="flex-1">
      {/* Hero */}
      {page.hero && (
        <SectionContainer className="pt-24 pb-16 md:pt-32 md:pb-24 bg-muted/30">
          <div className="max-w-4xl">
            <SectionHeading 
              title={page.hero.headline || 'Our Services'} 
              subtitle={page.hero.subheadline || undefined}
            />
          </div>
        </SectionContainer>
      )}

      {/* Services Grid */}
      {allServices && allServices.length > 0 && (
        <SectionContainer className="py-12 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service) => (
              <ServiceCard
                key={service._id}
                title={service.title || ''}
                shortDescription={service.shortDescription || ''}
                slug={service.slug?.current || ''}
                image={service.image as any}
              />
            ))}
          </div>
        </SectionContainer>
      )}

      {/* CTA Banner */}
      {page.cta && (
        <CTABannerSection data={page.cta as any} />
      )}
    </main>
  )
}
