import { defineField, defineType } from 'sanity'

const navItem = {
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'href', title: 'URL', type: 'string', validation: rule => rule.required() }),
    defineField({ name: 'openInNewTab', title: 'Open in New Tab', type: 'boolean', initialValue: false }),
    defineField({ name: 'enabled', title: 'Enabled (Visible)', type: 'boolean', initialValue: true }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', description: 'Used to strictly sort items. Default is the order in the array.' }),
    // future friendly architecture for dropdown menus
    defineField({ 
      name: 'children', 
      title: 'Dropdown Items', 
      type: 'array', 
      of: [{ type: 'object', fields: [
         defineField({ name: 'label', type: 'string', title: 'Label' }),
         defineField({ name: 'href', type: 'string', title: 'URL' }),
         defineField({ name: 'openInNewTab', type: 'boolean', title: 'Open in New Tab' }),
         defineField({ name: 'enabled', type: 'boolean', title: 'Enabled' })
      ]}] 
    }),
  ]
}

export default defineType({
  name: 'navigation',
  title: 'Site Navigation',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header Navigation' },
    { name: 'footerQuickLinks', title: 'Footer Quick Links' },
    { name: 'footerResources', title: 'Footer Resources' },
    { name: 'footerContactSupport', title: 'Footer Contact & Support' },
    { name: 'footerLegal', title: 'Footer Legal (Bottom Row)' },
  ],
  fields: [
    defineField({
      name: 'headerCtaText',
      title: 'Header CTA Text',
      type: 'string',
      group: 'header',
      initialValue: 'Book your Consultation',
      description: 'The text for the main CTA button in the header.',
    }),
    defineField({
      name: 'headerCtaLink',
      title: 'Header CTA Link',
      type: 'string',
      group: 'header',
      initialValue: '/book-consultation',
      description: 'The URL for the main CTA button in the header.',
    }),
    defineField({
      name: 'headerNav',
      title: 'Header Navigation',
      type: 'array',
      group: 'header',
      of: [navItem]
    }),
    defineField({
      name: 'footerQuickLinks',
      title: 'Footer Quick Links',
      type: 'array',
      group: 'footerQuickLinks',
      of: [navItem]
    }),
    defineField({
      name: 'footerResources',
      title: 'Footer Resources',
      type: 'array',
      group: 'footerResources',
      of: [navItem]
    }),
    defineField({
      name: 'footerContactSupport',
      title: 'Footer Contact & Support',
      type: 'array',
      group: 'footerContactSupport',
      of: [navItem]
    }),
    defineField({
      name: 'footerLegal',
      title: 'Footer Legal (Bottom Row)',
      type: 'array',
      group: 'footerLegal',
      of: [navItem]
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Global Site Navigation' }
    }
  }
})
