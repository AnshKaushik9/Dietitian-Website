import { defineField, defineType } from 'sanity'

export const blogPreviewSection = defineType({
  name: 'blogPreviewSection',
  title: 'Blog Preview Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subtitle' }),
    defineField({
      name: 'viewAllCta',
      type: 'cta',
      title: 'View All CTA',
      description: 'Optional CTA to link to the blog page',
    }),
  ],
})
