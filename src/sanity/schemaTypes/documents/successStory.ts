import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'successStory',
  title: 'Success Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isAnonymous',
      title: 'Anonymous Toggle',
      type: 'boolean',
      description: 'If toggled on, the surname will be masked (e.g., Priya S.).',
      initialValue: false,
    }),
    defineField({
      name: 'age',
      title: 'Age',
      type: 'number',
    }),
    defineField({
      name: 'gender',
      title: 'Gender',
      type: 'string',
    }),
    defineField({
      name: 'areaOfConcern',
      title: 'Area of Concern',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g., "3 months", "6 months"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'progressOutcome',
      title: 'Progress / Outcome',
      type: 'string',
      description: 'A brief 1-2 sentence highlight (e.g., "Lost 10kg and reversed PCOS symptoms")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Display this story on the homepage (if featured sections allow it).',
      initialValue: false,
    }),
    defineField({
      name: 'shortSummary',
      title: 'Short Summary',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fullStory',
      title: 'Full Story',
      type: 'blockContent',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO & Metadata',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      clientName: 'clientName',
      isAnonymous: 'isAnonymous',
      media: 'featuredImage',
    },
    prepare({ title, clientName, isAnonymous, media }) {
      const nameParts = (clientName || '').split(' ')
      let displayName = clientName
      if (isAnonymous && nameParts.length > 1) {
        const firstName = nameParts[0]
        const lastInitial = nameParts[nameParts.length - 1][0]
        displayName = `${firstName} ${lastInitial}.`
      }

      return {
        title,
        subtitle: displayName,
        media,
      }
    },
  },
})
