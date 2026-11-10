import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blogPage',
  title: 'Blog Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Document Title (Internal)',
      type: 'string',
      validation: (rule) => rule.required(),
      initialValue: 'Blog Page',
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
      name: 'featuredArticle',
      title: 'Featured Article',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'Select an article to feature at the top of the blog. If left empty, the latest article will be featured.',
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
