import { defineField, defineType } from 'sanity'

export const successStoriesSection = defineType({
  name: 'successStoriesSection',
  title: 'Success Stories Section',
  type: 'object',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title', initialValue: 'Success Stories' }),
    defineField({ name: 'subtitle', type: 'text', title: 'Subtitle' }),
    defineField({
      name: 'featuredStories',
      type: 'array',
      title: 'Featured Stories',
      description: 'Select up to 3 success stories to feature on the homepage. If left empty, it will display the latest 3 featured stories automatically.',
      of: [{ type: 'reference', to: [{ type: 'successStory' }] }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
})
