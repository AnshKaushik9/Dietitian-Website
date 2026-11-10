import { defineQuery } from 'next-sanity'

// Settings
export const settingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    title,
    description,
    brandName,
    logo,
    favicon,
    tagline,
    seoImage,
    primaryPhone,
    whatsappNumber,
    primaryEmail,
    businessAddress,
    businessHours,
    instagram,
    facebook,
    linkedin,
    twitter,
    youtube,
    calcomUrl,
    defaultWhatsappMessage,
    copyrightText,
    footerDescription,
    supportEmail,
    supportPhone,
    expectedResponseTime
  }
`)

// Homepage
export const homepageQuery = defineQuery(`
  *[_type == "homepage"][0]{
    title,
    seo,
    sections[]{
      ...,
      _type == "conditionsTreatedSection" => {
        "conditions": conditions[]->{
          _id,
          title,
          slug,
          icon,
          shortDescription
        }
      },
      _type == "servicesPreviewSection" => {
        "services": services[]->{
          _id,
          title,
          slug,
          image,
          "shortDescription": description[0].children[0].text
        }
      },
      _type == "testimonialsSection" => {
        "testimonials": testimonials[]->{
          _id,
          clientName,
          isAnonymous,
          quote,
          mediaType,
          mediaFile,
          conditionCategory->{title}
        }
      },
      _type == "faqSection" => {
        "faqs": faqs[]->{
          _id,
          question,
          answer
        }
      },
      _type == "blogPreviewSection" => {
        "posts": *[_type == "post"] | order(publishedAt desc)[0...3]{
          _id,
          title,
          slug,
          mainImage,
          publishedAt,
          "excerpt": body[0].children[0].text,
          author->{name},
          categories[]->{title}
        }
      },
      _type == "successStoriesSection" => {
        "featuredStories": coalesce(
          featuredStories[]->{
            _id,
            title,
            slug,
            clientName,
            isAnonymous,
            age,
            gender,
            areaOfConcern,
            duration,
            progressOutcome,
            featuredImage
          },
          *[_type == "successStory" && featured == true] | order(publishedDate desc)[0...3]{
            _id,
            title,
            slug,
            clientName,
            isAnonymous,
            age,
            gender,
            areaOfConcern,
            duration,
            progressOutcome,
            featuredImage
          }
        )
      }
    }
  }
`)

// Services
export const allServicesQuery = defineQuery(`
  *[_type == "service"] | order(title asc){
    _id,
    title,
    slug,
    image,
    "shortDescription": description[0].children[0].text
  }
`)

export const serviceBySlugQuery = defineQuery(`
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    seo,
    description,
    whoItsFor,
    conditionsCovered[]->{
      _id,
      title,
      slug,
      shortDescription,
      icon
    },
    whatClientsReceive,
    faqs[]->{
      _id,
      question,
      answer
    },
    cta,
    image
  }
`)

// Testimonials
export const approvedTestimonialsQuery = defineQuery(`
  *[_type == "testimonial" && approvalStatus == "Approved"] | order(_createdAt desc){
    _id,
    clientName,
    isAnonymous,
    quote,
    mediaType,
    mediaFile,
    conditionCategory->{title}
  }
`)

// Blog Posts
export const allPostsQuery = defineQuery(`
  *[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    "excerpt": body[0].children[0].text,
    author->{name, image},
    categories[]->{title}
  }
`)

export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    seo,
    mainImage,
    publishedAt,
    body,
    author->{name, image, bio},
    categories[]->{title}
  }
`)

// Success Stories
export const allSuccessStoriesQuery = defineQuery(`
  *[_type == "successStory"] | order(publishedDate desc){
    _id,
    title,
    slug,
    clientName,
    isAnonymous,
    age,
    gender,
    areaOfConcern,
    duration,
    progressOutcome,
    featuredImage
  }
`)

export const successStoryBySlugQuery = defineQuery(`
  *[_type == "successStory" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    seo,
    clientName,
    isAnonymous,
    age,
    gender,
    areaOfConcern,
    duration,
    progressOutcome,
    shortSummary,
    fullStory,
    featuredImage,
    beforeImage,
    afterImage,
    publishedDate
  }
`)

// Navigation
export const navigationQuery = defineQuery(`
  *[_type == "navigation"][0]{
    headerCtaText,
    headerCtaLink,
    headerNav[]{
      label, href, openInNewTab, enabled, displayOrder, children[]{ label, href, openInNewTab, enabled }
    },
    footerQuickLinks[]{
      label, href, openInNewTab, enabled, displayOrder, children[]{ label, href, openInNewTab, enabled }
    },
    footerResources[]{
      label, href, openInNewTab, enabled, displayOrder, children[]{ label, href, openInNewTab, enabled }
    },
    footerContactSupport[]{
      label, href, openInNewTab, enabled, displayOrder, children[]{ label, href, openInNewTab, enabled }
    }
  }
`)

// Pages
export const contactPageQuery = defineQuery(`
  *[_type == "contactPage"][0]{
    heroHeading,
    heroSubtitle,
    formHeading,
    formDescription,
    submitButtonText,
    successMessage,
    errorMessage,
    socialHighlightText
  }
`)

export const supportPageQuery = defineQuery(`
  *[_type == "supportPage"][0]{
    heroHeading,
    heroDescription,
    formHeading,
    formDescription,
    submitButtonText,
    successMessage,
    errorMessage,
    helpSectionHeading1,
    helpSectionHeading2
  }
`)

export const bookConsultationPageQuery = defineQuery(`
  *[_type == "bookConsultationPage"][0]{
    heroHeading,
    heroSubtitle,
    unavailableMessage,
    chatHeading,
    chatDescription,
    chatButtonText
  }
`)

export const successStoriesPageQuery = defineQuery(`
  *[_type == "successStoriesPage"][0]{
    heroHeading,
    heroSubtitle,
    emptyStateHeading,
    emptyStateDescription,
    emptyStateButtonText
  }
`)

export const servicesPageQuery = defineQuery(`
  *[_type == "servicesPage"][0]{
    seo,
    hero,
    cta
  }
`)

export const conditionsPageQuery = defineQuery(`
  *[_type == "conditionsPage"][0]{
    seo,
    hero,
    faq{
      ...,
      "faqs": faqs[]->{
        _id,
        question,
        answer
      }
    },
    cta
  }
`)

export const allConditionsQuery = defineQuery(`
  *[_type == "condition"] | order(title asc){
    _id,
    title,
    slug,
    icon,
    shortDescription
  }
`)

export const blogPageQuery = defineQuery(`
  *[_type == "blogPage"][0]{
    seo,
    hero,
    featuredArticle->{
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      "excerpt": body[0].children[0].text,
      author->{name, image},
      categories[]->{title}
    },
    cta
  }
`)

// Generic Page
export const genericPageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    seo,
    content
  }
`)

// Sitemap Routes
export const sitemapQuery = defineQuery(`
  {
    "pages": *[_type == "page"]{ "slug": slug.current, _updatedAt },
    "services": *[_type == "service"]{ "slug": slug.current, _updatedAt },
    "conditions": *[_type == "condition"]{ "slug": slug.current, _updatedAt },
    "posts": *[_type == "post"]{ "slug": slug.current, _updatedAt },
    "successStories": *[_type == "successStory"]{ "slug": slug.current, _updatedAt }
  }
`)