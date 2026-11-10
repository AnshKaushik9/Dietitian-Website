import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/client'
import { successStoryBySlugQuery } from '@/sanity/lib/queries'
import { SanityImage } from '@/components/shared/SanityImage'
import { PortableText } from 'next-sanity'
import { SectionContainer } from '@/components/shared/SectionContainer'
import { CTAButton } from '@/components/shared/Buttons'
import { Calendar, User, Clock, CheckCircle } from 'lucide-react'
import { SuccessStoryBySlugQueryResult } from '@/../sanity.types'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const story = await sanityFetch<SuccessStoryBySlugQueryResult>({
    query: successStoryBySlugQuery,
    params: { slug },
  })

  if (!story) return {}

  return {
    title: story.seo?.metaTitle || `${story.title} | Success Stories`,
    description: story.seo?.metaDescription || story.shortSummary,
  }
}

export default async function SuccessStoryDetailPage({ params }: Props) {
  const { slug } = await params
  const story = await sanityFetch<SuccessStoryBySlugQueryResult>({
    query: successStoryBySlugQuery,
    params: { slug },
  })

  if (!story) {
    notFound()
  }

  // Format the name if anonymous
  let displayName = story.clientName
  if (story.isAnonymous && displayName) {
    const nameParts = displayName.split(' ')
    if (nameParts.length > 1) {
      const firstName = nameParts[0]
      const lastInitial = nameParts[nameParts.length - 1][0]
      displayName = `${firstName} ${lastInitial}.`
    }
  }

  return (
    <main className="flex-1 bg-background pt-24 pb-16 md:pt-32 md:pb-24">
      <SectionContainer className="max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {story.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {story.shortSummary}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium text-muted-foreground bg-muted/50 py-3 px-6 rounded-full w-fit mx-auto">
            {displayName && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{displayName} {story.age ? `(${story.age})` : ''}</span>
              </div>
            )}
            {story.duration && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{story.duration}</span>
              </div>
            )}
            {story.publishedDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(story.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {story.featuredImage && (
          <div className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden mb-12 shadow-lg">
            <SanityImage
              image={story.featuredImage}
              alt={story.title || "Success Story Image"}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Quick Stats / Outcome */}
        <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 mb-12">
          <h3 className="font-semibold text-lg mb-4 text-primary flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Key Outcome
          </h3>
          <p className="text-lg md:text-xl font-medium leading-relaxed">
            {story.progressOutcome}
          </p>
          {story.areaOfConcern && (
            <div className="mt-4 inline-flex bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {story.areaOfConcern}
            </div>
          )}
        </div>

        {/* Story Content */}
        <div className="prose prose-lg md:prose-xl max-w-none mb-16">
          {story.fullStory ? (
            <PortableText value={story.fullStory} />
          ) : null}
        </div>

        {/* Before / After Images (Optional) */}
        {(story.beforeImage || story.afterImage) && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6">Transformation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {story.beforeImage && (
                <div className="space-y-3">
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-md">
                    <SanityImage
                      image={story.beforeImage}
                      alt="Before"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-center font-medium text-muted-foreground">Before</p>
                </div>
              )}
              {story.afterImage && (
                <div className="space-y-3">
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-md">
                    <SanityImage
                      image={story.afterImage}
                      alt="After"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-center font-medium text-muted-foreground">After</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="bg-muted/30 rounded-3xl p-8 md:p-12 text-center border shadow-sm">
          <h2 className="text-3xl font-bold mb-4">Ready to Write Your Own Success Story?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Book your consultation today to receive a personalized, evidence-based nutrition plan tailored exactly to your unique body and goals.
          </p>
          <CTAButton href="/book-consultation">
            Book your Consultation
          </CTAButton>
        </div>
      </SectionContainer>
    </main>
  )
}
