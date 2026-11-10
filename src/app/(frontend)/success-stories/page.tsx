import { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { allSuccessStoriesQuery, successStoriesPageQuery } from '@/sanity/lib/queries'
import { SectionContainer } from '@/components/shared/SectionContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { SuccessStoryCard } from '@/components/shared/SuccessStoryCard'
import { AllSuccessStoriesQueryResult } from '@/../sanity.types'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Success Stories | Clinical Dietitian',
  description: 'Read inspiring success stories from our patients.',
}

export default async function SuccessStoriesPage() {
  const stories = await sanityFetch<AllSuccessStoriesQueryResult>({ 
    query: allSuccessStoriesQuery,
    tags: ['successStory']
  })
  const pageData = await sanityFetch<any>({ query: successStoriesPageQuery })

  return (
    <main className="flex-1">
      <SectionContainer className="pt-24 pb-16 md:pt-32 md:pb-24 bg-muted/30">
        <SectionHeading 
          title={pageData?.heroHeading || "Success Stories"} 
          subtitle={pageData?.heroSubtitle || "Real people, real results. See how personalized nutrition can transform lives."} 
          className="mb-12 md:mb-16"
        />

        {stories && stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {stories.map((story) => (
              <SuccessStoryCard key={story._id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold mb-4">{pageData?.emptyStateHeading || "No stories published yet."}</h3>
            <p className="text-muted-foreground mb-8">{pageData?.emptyStateDescription || "Check back soon for inspiring transformations."}</p>
            <Link href="/book-consultation" className={buttonVariants({ size: "lg" })}>
              {pageData?.emptyStateButtonText || "Start Your Journey"}
            </Link>
          </div>
        )}
      </SectionContainer>
    </main>
  )
}
