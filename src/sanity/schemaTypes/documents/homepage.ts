import { defineField, defineType } from 'sanity'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({ name: 'headline', type: 'string', title: 'Headline' }),
    defineField({ name: 'subheadline', type: 'text', title: 'Subheadline' }),
    defineField({ name: 'primaryCta', type: 'cta', title: 'Primary CTA' }),
    defineField({ name: 'secondaryCta', type: 'cta', title: 'Secondary CTA' }),
    defineField({ name: 'backgroundImage', type: 'image', title: 'Background Image', options: { hotspot: true } }),
  ],
})

export const credentialsSection = defineType({
  name: 'credentialsSection',
  title: 'Credentials Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'yearsOfExperience', type: 'number', title: 'Years of Experience', initialValue: 6 }),
    defineField({ name: 'qualification', type: 'string', title: 'Qualification' }),
    defineField({ name: 'certifications', type: 'string', title: 'Certifications' }),
    defineField({ name: 'patientsGuided', type: 'number', title: 'Patients Guided' }),
    defineField({ name: 'evidenceBasedApproach', type: 'boolean', title: 'Evidence Based Approach', initialValue: true }),
    defineField({
      name: 'logos',
      type: 'array',
      title: 'Logos',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
})

export const whyChooseMeSection = defineType({
  name: 'whyChooseMeSection',
  title: 'Why Choose Me Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'description', type: 'blockContent', title: 'Description' }),
    defineField({
      name: 'bulletPoints',
      type: 'array',
      title: 'Bullet Points',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
  ],
})

export const servicesPreviewSection = defineType({
  name: 'servicesPreviewSection',
  title: 'Services Preview Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subtitle' }),
    defineField({
      name: 'services',
      type: 'array',
      title: 'Featured Services',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
  ],
})

export const testimonialsSection = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({
      name: 'testimonials',
      type: 'array',
      title: 'Featured Testimonials',
      description: 'Leave empty to automatically show the latest approved testimonials.',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
    }),
  ],
})

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({
      name: 'faqs',
      type: 'array',
      title: 'FAQs',
      of: [{ type: 'reference', to: [{ type: 'faq' }] }],
    }),
  ],
})

export const ctaBannerSection = defineType({
  name: 'ctaBannerSection',
  title: 'CTA Banner Section',
  type: 'object',
  fields: [
    defineField({ name: 'headline', type: 'string', title: 'Headline' }),
    defineField({ name: 'subheadline', type: 'text', title: 'Subheadline' }),
    defineField({ name: 'cta', type: 'cta', title: 'Call to Action' }),
    defineField({ name: 'secondaryCta', type: 'cta', title: 'Secondary Call to Action (e.g., WhatsApp)' }),
  ],
})

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title (Internal)',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Homepage',
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Metadata',
      type: 'seo',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        { type: 'heroSection' },
        { type: 'credentialsSection' },
        { type: 'whyChooseMeSection' },
        { type: 'conditionsTreatedSection' },
        { type: 'servicesPreviewSection' },
        { type: 'testimonialsSection' },
        { type: 'faqSection' },
        { type: 'ctaBannerSection' },
        { type: 'consultationProcessSection' },
        { type: 'successStoriesSection' },
        { type: 'blogPreviewSection' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
})
