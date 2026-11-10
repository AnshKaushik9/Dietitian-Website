import Link from 'next/link'
import { SanityImage } from '@/components/shared/SanityImage'
import { ArrowRight, User, Clock, CheckCircle } from 'lucide-react'

import { AllSuccessStoriesQueryResult } from '@/../sanity.types'

type SuccessStoryProps = {
  story: AllSuccessStoriesQueryResult[number]
}

export function SuccessStoryCard({ story }: SuccessStoryProps) {
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
    <Link href={`/success-stories/${story.slug?.current}`} className="group h-full flex flex-col bg-background rounded-3xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        {story.featuredImage ? (
          <SanityImage
            image={story.featuredImage}
            alt={story.title || 'Success Story'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            No image available
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6 lg:p-8">
        <h3 className="text-xl md:text-2xl font-semibold mb-4 line-clamp-2 group-hover:text-primary transition-colors">
          {story.title}
        </h3>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          {displayName && (
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>{displayName} {story.age ? `(${story.age})` : ''}</span>
            </div>
          )}
          {story.duration && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{story.duration}</span>
            </div>
          )}
        </div>

        <div className="bg-primary/5 rounded-xl p-4 mb-6">
          <h4 className="font-medium text-primary text-sm uppercase tracking-wider mb-2">Outcome</h4>
          <div className="flex items-start gap-2">
            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm font-medium leading-relaxed">
              {story.progressOutcome}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-6 flex items-center text-primary font-medium">
          Read Full Story
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
