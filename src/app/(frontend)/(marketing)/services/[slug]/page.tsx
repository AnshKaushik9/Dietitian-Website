import { sanityFetch } from '@/sanity/lib/client'
import { serviceBySlugQuery } from '@/sanity/lib/queries'
import { ServiceBySlugQueryResult } from '../../../../../../sanity.types'
import { notFound } from 'next/navigation'
import { SectionContainer } from '@/components/shared/SectionContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { PortableTextRenderer } from '@/components/shared/PortableTextRenderer'
import { SanityImage } from '@/components/shared/SanityImage'
import { CheckCircle2 } from 'lucide-react'
import { CTABannerSection } from '@/components/sections/homepage/CTABannerSection'
import { FAQSection } from '@/components/sections/homepage/FAQSection'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await sanityFetch<ServiceBySlugQueryResult>({ 
    query: serviceBySlugQuery, 
    params: { slug } 
  })
  return {
    title: service?.seo?.metaTitle || service?.title || 'Service Details',
    description: service?.seo?.metaDescription || 'Details about this clinical nutrition service.',
  }
}

export async function generateStaticParams() {
  const services = await sanityFetch<{ slug: { current: string } }[]>({ 
    query: `*[_type == "service"]{ slug }` 
  })
  return services.map(s => ({ slug: s.slug.current }))
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = await sanityFetch<ServiceBySlugQueryResult>({ 
    query: serviceBySlugQuery, 
    params: { slug } 
  })

  if (!service) {
    notFound()
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <SectionContainer className="pt-24 pb-16 md:pt-32 md:pb-24 bg-muted/30">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
              {service.title}
            </h1>
            <div className="text-xl text-muted-foreground">
              <PortableTextRenderer value={service.description} />
            </div>
          </div>
          {service.image && (
            <div className="relative aspect-video lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <SanityImage image={service.image} alt={service.title || 'Service Image'} fill className="object-cover" />
            </div>
          )}
        </div>
      </SectionContainer>

      {/* Details (Who it's for & What you get) */}
      <SectionContainer>
        <div className="grid md:grid-cols-2 gap-16">
          {service.whoItsFor && (
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">Who This Is For</h2>
              <PortableTextRenderer value={service.whoItsFor} />
            </div>
          )}
          {service.whatClientsReceive && service.whatClientsReceive.length > 0 && (
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6">What You Receive</h2>
              <ul className="space-y-4">
                {service.whatClientsReceive.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </SectionContainer>

      {/* Related Conditions */}
      {service.conditionsCovered && service.conditionsCovered.length > 0 && (
        <SectionContainer className="bg-primary/5">
          <SectionHeading title="Conditions Managed" subtitle="This service supports the management of these specific conditions." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {service.conditionsCovered.map((condition) => (
              <div key={condition._id} className="bg-background p-6 rounded-xl shadow-sm text-center">
                {condition.icon && (
                  <div className="mx-auto relative w-12 h-12 mb-4">
                    <SanityImage image={condition.icon} alt={condition.title || 'Condition Icon'} fill className="object-contain" />
                  </div>
                )}
                <h3 className="font-heading font-semibold text-lg">{condition.title}</h3>
              </div>
            ))}
          </div>
        </SectionContainer>
      )}

      {/* FAQs */}
      {service.faqs && service.faqs.length > 0 && (
        <SectionContainer>
          <FAQSection data={{ _type: 'faqSection', title: 'Frequently Asked Questions', faqs: service.faqs } as any} />
        </SectionContainer>
      )}

      {/* CTA */}
      {service.cta ? (
        <CTABannerSection data={{ _type: 'ctaBannerSection', headline: service.cta.label || 'Ready to start?', subheadline: 'Book your session today.', cta: service.cta } as any} />
      ) : (
        <CTABannerSection data={{ 
          _type: 'ctaBannerSection', 
          headline: 'Ready to take control of your health?', 
          subheadline: 'Book your initial consultation to discuss this service in detail.', 
          cta: { label: 'Book your Consultation', link: '/book-consultation' } 
        } as any} />
      )}
    </main>
  )
}
