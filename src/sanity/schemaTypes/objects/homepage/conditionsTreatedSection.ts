import { defineField, defineType } from 'sanity'

export const conditionsTreatedSection = defineType({
  name: 'conditionsTreatedSection',
  title: 'Conditions Treated Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subtitle' }),
    defineField({
      name: 'conditions',
      type: 'array',
      title: 'Conditions',
      of: [{ type: 'reference', to: [{ type: 'condition' }] }],
    }),
  ],
})
