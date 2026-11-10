import { defineField, defineType } from 'sanity'

export const consultationProcessSection = defineType({
  name: 'consultationProcessSection',
  title: 'Consultation Process Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subtitle' }),
    defineField({
      name: 'steps',
      type: 'array',
      title: 'Process Steps',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', type: 'string', title: 'Step Title' }),
            defineField({ name: 'description', type: 'text', title: 'Description' }),
            defineField({ name: 'icon', type: 'image', title: 'Icon (Optional)', options: { hotspot: true } }),
          ]
        }
      ]
    }),
  ],
})
