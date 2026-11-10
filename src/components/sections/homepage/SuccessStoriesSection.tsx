import { SectionContainer } from '@/components/shared/SectionContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { SuccessStoryCard } from '@/components/shared/SuccessStoryCard'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { HomepageQueryResult } from '@/../sanity.types'

type SuccessStoriesSectionData = Extract<
  NonNullable<NonNullable<HomepageQueryResult>['sections']>[number],
  { _type: 'successStoriesSection' }
>

export function SuccessStoriesSection({ data }: { data: SuccessStoriesSectionData }) {
  if (!data?.featuredStories || data.featuredStories.length === 0) {
    return null
  }

  return (
    <section className="bg-muted/30">
      <SectionContainer>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <SectionHeading
            title={data.title || 'Success Stories'}
            subtitle={data.subtitle || 'Real results from our personalized nutrition programs.'}
            align="left"
            className="mb-0"
          />
          <Link href="/success-stories" className={buttonVariants({ variant: "outline", size: "lg", className: "shrink-0 bg-background" })}>
            View All Stories
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.featuredStories.map((story: any) => (
            story ? <SuccessStoryCard key={story._id} story={story} /> : null
          ))}
        </div>
      </SectionContainer>
    </section>
  )
}
