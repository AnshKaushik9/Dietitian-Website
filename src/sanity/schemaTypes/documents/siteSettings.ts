import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'branding', title: 'Branding' },
    { name: 'contact', title: 'Contact Information' },
    { name: 'social', title: 'Social Media' },
    { name: 'consultation', title: 'Consultation' },
    { name: 'footer', title: 'Footer' },
    { name: 'support', title: 'Technical Support' },
  ],
  fields: [
    // Branding
    defineField({
      name: 'title',
      title: 'Site Title',
      type: 'string',
      group: 'branding',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Site Description',
      type: 'text',
      group: 'branding',
      description: 'Used for the default SEO meta description.',
    }),
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      group: 'branding',
    }),
    defineField({
      name: 'logo',
      title: 'Site Logo',
      type: 'image',
      group: 'branding',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      group: 'branding',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'branding',
    }),
    defineField({
      name: 'seoImage',
      title: 'Default SEO Image',
      type: 'image',
      group: 'branding',
      description: 'Fallback Open Graph image for social sharing.',
      options: {
        hotspot: true,
      },
    }),

    // Contact Information
    defineField({
      name: 'primaryPhone',
      title: 'Primary Phone',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'WhatsApp Number',
      type: 'string',
      group: 'contact',
      description: 'Include country code without +, e.g. 919876543210',
    }),
    defineField({
      name: 'primaryEmail',
      title: 'Primary Email',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'businessAddress',
      title: 'Business Address',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      name: 'businessHours',
      title: 'Business Hours',
      type: 'string',
      group: 'contact',
    }),

    // Social Media
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'twitter',
      title: 'X (Twitter)',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'youtube',
      title: 'YouTube',
      type: 'url',
      group: 'social',
    }),

    // Consultation
    defineField({
      name: 'calcomUrl',
      title: 'Cal.com Booking URL',
      type: 'url',
      group: 'consultation',
    }),
    defineField({
      name: 'defaultWhatsappMessage',
      title: 'Default WhatsApp Message',
      type: 'text',
      group: 'consultation',
      description: 'e.g., "Hello, I would like to book a consultation."',
    }),

    // Footer
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      group: 'footer',
    }),
    defineField({
      name: 'footerDescription',
      title: 'Footer Description',
      type: 'text',
      group: 'footer',
    }),

    // Technical Support
    defineField({
      name: 'supportEmail',
      title: 'Support Email',
      type: 'string',
      group: 'support',
    }),
    defineField({
      name: 'supportPhone',
      title: 'Support Phone',
      type: 'string',
      group: 'support',
    }),
    defineField({
      name: 'expectedResponseTime',
      title: 'Expected Response Time',
      type: 'string',
      group: 'support',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Global Site Settings',
      }
    }
  }
})
