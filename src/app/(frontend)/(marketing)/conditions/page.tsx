import { sanityFetch } from '@/sanity/lib/client'
import { conditionsPageQuery, allConditionsQuery } from '@/sanity/lib/queries'
import { ConditionsPageQueryResult, AllConditionsQueryResult } from '../../../../../sanity.types'
import { notFound } from 'next/navigation'
import { SectionContainer } from '@/components/shared/SectionContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { SanityImage } from '@/components/shared/SanityImage'
import { CTABannerSection } from '@/components/sections/homepage/CTABannerSection'
import { FAQSection } from '@/components/sections/homepage/FAQSection'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<ConditionsPageQueryResult>({ query: conditionsPageQuery })
  return {
    title: page?.seo?.metaTitle || 'Conditions Treated',
    description: page?.seo?.metaDescription || 'Learn about the clinical conditions we manage.',
  }
}

export default async function ConditionsPage() {
  const [page, conditions] = await Promise.all([
    sanityFetch<ConditionsPageQueryResult>({ query: conditionsPageQuery }),
    sanityFetch<AllConditionsQueryResult>({ query: allConditionsQuery })
  ])

  if (!page) {
    notFound()
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      {page.hero && (
        <SectionContainer className="pt-24 pb-16 md:pt-32 md:pb-24 bg-muted/30 text-center">
          <SectionHeading 
            title={page.hero.headline || 'Conditions Treated'} 
            subtitle={page.hero.subheadline || undefined}
            align="center"
          />
        </SectionContainer>
      )}

      {/* Conditions Accordion/Detail Cards */}
      <SectionContainer>
        <div className="max-w-4xl mx-auto">
          {/* @ts-expect-error Shadcn UI type issue */}
          <Accordion type="single" collapsible className="w-full">
            {conditions.map((condition, index) => (
              <AccordionItem key={condition._id} value={condition._id} className="bg-background border rounded-lg mb-4 px-6 data-[state=open]:shadow-md transition-shadow">
                <AccordionTrigger className="hover:no-underline py-6">
                  <div className="flex items-center gap-6 text-left">
                    {condition.icon ? (
                      <div className="relative w-16 h-16 shrink-0 bg-primary/5 rounded-full p-3">
                        <SanityImage image={condition.icon} alt={condition.title || 'Condition Icon'} fill className="object-contain p-2" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 shrink-0 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="font-heading font-bold text-primary text-xl">
                          {index + 1}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl font-heading font-semibold">{condition.title}</h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-2 pl-22">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {condition.shortDescription}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </SectionContainer>

      {/* FAQ Preview */}
      {page.faq && (
        <SectionContainer className="bg-primary/5">
          <FAQSection data={page.faq as any} />
        </SectionContainer>
      )}

      {/* CTA Banner */}
      {page.cta && (
        <CTABannerSection data={page.cta as any} />
      )}
    </main>
  )
}
