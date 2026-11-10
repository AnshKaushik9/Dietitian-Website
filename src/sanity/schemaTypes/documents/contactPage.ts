import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'formSettings', title: 'Form Settings' },
    { name: 'misc', title: 'Miscellaneous' },
  ],
  fields: [
    // Hero
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'hero',
      initialValue: 'Contact Us',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      group: 'hero',
      initialValue: "Whether you're ready to start your journey or just have a few questions, we'd love to hear from you. Reach out to us using any of the methods below.",
    }),
    
    // Form Settings
    defineField({
      name: 'formHeading',
      title: 'Form Heading',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Send us a Message',
    }),
    defineField({
      name: 'formDescription',
      title: 'Form Description',
      type: 'text',
      group: 'formSettings',
      initialValue: 'Fill out the form below and we will get back to you as soon as possible.',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Send Message',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Message sent successfully! We will get back to you soon.',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Something went wrong. Please try again.',
    }),

    // Misc
    defineField({
      name: 'socialHighlightText',
      title: 'Social Highlight Text',
      type: 'string',
      group: 'misc',
      initialValue: 'Follow us on social media',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Contact Page Configuration' }
    }
  }
})
