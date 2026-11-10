import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './objects/blockContent'
import category from './documents/category'
import post from './documents/post'
import author from './documents/author'
import successStory from './documents/successStory'
import servicesPage from './documents/servicesPage'
import conditionsPage from './documents/conditionsPage'
import blogPage from './documents/blogPage'
import siteSettings from './documents/siteSettings'
import navigation from './documents/navigation'
import contactPage from './documents/contactPage'
import supportPage from './documents/supportPage'
import bookConsultationPage from './documents/bookConsultationPage'
import successStoriesPage from './documents/successStoriesPage'
import page from './documents/page'
import service from './documents/service'
import condition from './documents/condition'
import testimonial from './documents/testimonial'
import faq from './documents/faq'
import cta from './objects/cta'
import seo from './objects/seo'
import homepage, {
  heroSection,
  credentialsSection,
  whyChooseMeSection,
  servicesPreviewSection,
  testimonialsSection,
  faqSection,
  ctaBannerSection,
} from './documents/homepage'
import { conditionsTreatedSection } from './objects/homepage/conditionsTreatedSection'
import { consultationProcessSection } from './objects/homepage/consultationProcessSection'
import { blogPreviewSection } from './objects/homepage/blogPreviewSection'
import { successStoriesSection } from './objects/homepage/successStoriesSection'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  blockContent,
  cta,
  seo,
  heroSection,
  credentialsSection,
  whyChooseMeSection,
  servicesPreviewSection,
  testimonialsSection,
  faqSection,
  ctaBannerSection,
  conditionsTreatedSection,
  consultationProcessSection,
  blogPreviewSection,
  successStoriesSection,

  // Documents
  servicesPage,
  conditionsPage,
  blogPage,
  siteSettings,
  navigation,
  contactPage,
  supportPage,
  bookConsultationPage,
  successStoriesPage,
  homepage,
  page,
  service,
  condition,
  testimonial,
  faq,
  author,
  category,
  post,
  successStory,
]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
