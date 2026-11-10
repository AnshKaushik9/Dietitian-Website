import { sanityFetch } from '@/sanity/lib/client'
import { blogPageQuery, allPostsQuery } from '@/sanity/lib/queries'
import { BlogPageQueryResult, AllPostsQueryResult } from '../../../../sanity.types'
import { notFound } from 'next/navigation'
import { SectionContainer } from '@/components/shared/SectionContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { CTABannerSection } from '@/components/sections/homepage/CTABannerSection'
import { BlogSearch } from '@/components/sections/blog/BlogSearch'
import { BlogCard } from '@/components/shared/Cards'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await sanityFetch<BlogPageQueryResult>({ query: blogPageQuery })
  return {
    title: page?.seo?.metaTitle || 'Blog & Articles',
    description: page?.seo?.metaDescription || 'Read our latest insights on nutrition and wellness.',
  }
}

export default async function BlogListingPage() {
  const [page, posts] = await Promise.all([
    sanityFetch<BlogPageQueryResult>({ query: blogPageQuery }),
    sanityFetch<AllPostsQueryResult>({ query: allPostsQuery })
  ])

  if (!page) {
    notFound()
  }

  // Extract unique categories from posts
  const categorySet = new Set<string>()
  posts.forEach(post => {
    post.categories?.forEach(cat => {
      if (cat.title) categorySet.add(cat.title)
    })
  })
  const categories = Array.from(categorySet).sort()

  const featured = page.featuredArticle || posts[0]

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <SectionContainer className="pt-24 pb-12 md:pt-32 md:pb-16 bg-muted/30 text-center">
        <SectionHeading 
          title={page.hero?.headline || 'Blog & Articles'} 
          subtitle={page.hero?.subheadline || undefined}
          align="center"
        />
      </SectionContainer>

      {/* Featured Article */}
      {featured && (
        <SectionContainer className="py-12">
          <h2 className="text-2xl font-heading font-bold mb-8">Featured Article</h2>
          <div className="max-w-4xl mx-auto">
            <BlogCard
              title={featured.title || ''}
              excerpt={featured.excerpt || undefined}
              date={featured.publishedAt || ''}
              category={featured.categories?.[0]?.title || undefined}
              slug={featured.slug?.current || ''}
              image={featured.mainImage as any}
            />
          </div>
        </SectionContainer>
      )}

      {/* Blog Search & Grid */}
      <SectionContainer className="bg-primary/5 min-h-[500px]">
        <BlogSearch posts={posts as any} categories={categories} />
      </SectionContainer>

      {/* CTA Banner */}
      {page.cta && (
        <CTABannerSection data={page.cta as any} />
      )}
    </main>
  )
}
