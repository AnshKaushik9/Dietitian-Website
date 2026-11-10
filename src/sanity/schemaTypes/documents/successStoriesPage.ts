import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'successStoriesPage',
  title: 'Success Stories Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'emptyState', title: 'Empty State' },
  ],
  fields: [
    // Hero
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'hero',
      initialValue: 'Success Stories',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      group: 'hero',
      initialValue: 'Real people, real results. See how personalized nutrition can transform lives.',
    }),
    
    // Empty State
    defineField({
      name: 'emptyStateHeading',
      title: 'Empty State Heading',
      type: 'string',
      group: 'emptyState',
      initialValue: 'No stories published yet.',
    }),
    defineField({
      name: 'emptyStateDescription',
      title: 'Empty State Description',
      type: 'text',
      group: 'emptyState',
      initialValue: 'Check back soon for inspiring transformations.',
    }),
    defineField({
      name: 'emptyStateButtonText',
      title: 'Empty State Button Text',
      type: 'string',
      group: 'emptyState',
      initialValue: 'Start Your Journey',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Success Stories Page Configuration' }
    }
  }
})
