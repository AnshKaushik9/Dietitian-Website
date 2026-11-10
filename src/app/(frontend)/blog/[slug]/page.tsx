import { sanityFetch } from '@/sanity/lib/client'
import { postBySlugQuery } from '@/sanity/lib/queries'
import { PostBySlugQueryResult } from '../../../../../sanity.types'
import { notFound } from 'next/navigation'
import { SectionContainer } from '@/components/shared/SectionContainer'
import { PortableTextRenderer } from '@/components/shared/PortableTextRenderer'
import { SanityImage } from '@/components/shared/SanityImage'
import { ShareButtons } from '@/components/shared/ShareButtons'
import { format } from 'date-fns'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import type { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await sanityFetch<PostBySlugQueryResult>({ 
    query: postBySlugQuery, 
    params: { slug } 
  })
  return {
    title: post?.seo?.metaTitle || post?.title || 'Blog Post',
    description: post?.seo?.metaDescription || 'Read this article.',
  }
}

export async function generateStaticParams() {
  const posts = await sanityFetch<{ slug: { current: string } }[]>({ 
    query: `*[_type == "post"]{ slug }` 
  })
  return posts.map(p => ({ slug: p.slug.current }))
}

// Calculate reading time (roughly 200 words per minute)
function calculateReadingTime(blocks: any[]) {
  if (!blocks) return 0
  const text = blocks
    .filter(block => block._type === 'block')
    .map(block => block.children.map((child: any) => child.text).join(''))
    .join(' ')
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / 200)
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = await sanityFetch<PostBySlugQueryResult>({ 
    query: postBySlugQuery, 
    params: { slug } 
  })

  if (!post) {
    notFound()
  }

  const readingTime = calculateReadingTime(post.body || [])

  return (
    <main className="flex-1 pb-24">
      {/* Hero Header */}
      <div className="pt-24 md:pt-32 bg-muted/30">
        <SectionContainer className="pb-12 text-center max-w-4xl">
          <Link href="/blog" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to all articles
          </Link>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {post.categories?.map((cat, i) => (
              <span key={i} className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                {cat.title}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-sm">
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.image ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <SanityImage image={post.author.image} alt={post.author.name || 'Author'} fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {post.author.name?.charAt(0)}
                  </div>
                )}
                <span className="font-medium text-foreground">{post.author.name}</span>
              </div>
            )}
            <div className="flex items-center gap-4">
              {post.publishedAt && (
                <span>{format(new Date(post.publishedAt), 'dd MMM yyyy')}</span>
              )}
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
              <span>{readingTime} min read</span>
            </div>
          </div>
        </SectionContainer>
      </div>

      {/* Main Image */}
      {post.mainImage && (
        <SectionContainer className="py-0 -mt-8 relative z-10">
          <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
            <SanityImage image={post.mainImage} alt={post.title || 'Cover Image'} fill className="object-cover" />
          </div>
        </SectionContainer>
      )}

      {/* Content */}
      <SectionContainer className="pt-16 max-w-3xl">
        <article>
          <PortableTextRenderer value={post.body} />
        </article>

        {/* Footer & Share */}
        <div className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          {post.author && (
            <div className="flex items-center gap-4">
              {post.author.image && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <SanityImage image={post.author.image} alt={post.author.name || 'Author'} fill className="object-cover" />
                </div>
              )}
              <div>
                <h4 className="font-medium">Written by {post.author.name}</h4>
                {post.author.bio && (
                  <div className="text-sm text-muted-foreground line-clamp-2 max-w-xs prose-sm prose-p:my-0">
                    <PortableTextRenderer value={post.author.bio} />
                  </div>
                )}
              </div>
            </div>
          )}
          <ShareButtons title={post.title || ''} />
        </div>
      </SectionContainer>
    </main>
  )
}
