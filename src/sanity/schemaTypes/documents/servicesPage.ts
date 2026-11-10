import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title (Internal)',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Services Page',
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Metadata',
      type: 'seo',
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
        defineField({ name: 'subheadline', type: 'text', title: 'Subheadline' }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'ctaBannerSection',
    })
  ],
  preview: {
    select: {
      title: 'title',
    }
  }
})
