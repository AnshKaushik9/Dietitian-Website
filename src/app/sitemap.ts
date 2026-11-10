import { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { sitemapQuery } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.yourdomain.com'

  // Fetch routes from CMS
  const data = await sanityFetch<any>({ query: sitemapQuery })
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/conditions`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/book-consultation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ]

  if (data?.pages) {
    data.pages.forEach((page: any) => {
      // Exclude contact as it's hardcoded above (though it could just merge)
      if (page.slug !== 'contact') {
        routes.push({
          url: `${baseUrl}/${page.slug}`,
          lastModified: new Date(page._updatedAt),
          changeFrequency: 'yearly',
          priority: 0.5,
        })
      }
    })
  }

  if (data?.services) {
    data.services.forEach((service: any) => {
      routes.push({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(service._updatedAt),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    })
  }

  if (data?.posts) {
    data.posts.forEach((post: any) => {
      routes.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post._updatedAt),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })
  }

  return routes
}
