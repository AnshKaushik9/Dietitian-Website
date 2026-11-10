import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isAnonymous',
      title: 'Is Anonymous?',
      type: 'boolean',
      initialValue: false,
      description: 'If true, the full name and photo will be hidden.',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'conditionCategory',
      title: 'Condition Category',
      type: 'reference',
      to: [{ type: 'condition' }],
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text-only', value: 'text' },
          { title: 'Client Photo', value: 'photo' },
          { title: 'Before/After Image', value: 'beforeAfter' },
        ],
      },
      initialValue: 'text',
    }),
    defineField({
      name: 'mediaFile',
      title: 'Media File',
      type: 'image',
      hidden: ({ document }) => document?.mediaType === 'text',
      options: { hotspot: true },
    }),
    defineField({
      name: 'approvalStatus',
      title: 'Approval Status',
      type: 'string',
      options: {
        list: ['Draft', 'Approved', 'Published'],
      },
      initialValue: 'Draft',
    }),
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'approvalStatus',
      media: 'mediaFile',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title || 'Anonymous Client',
        subtitle: subtitle ? `Status: ${subtitle}` : '',
        media: media,
      }
    }
  }
})
