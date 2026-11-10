import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'supportPage',
  title: 'Support Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'formSettings', title: 'Form Settings' },
    { name: 'helpSection', title: 'Help Section' },
  ],
  fields: [
    // Hero
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'hero',
      initialValue: 'Technical Support',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      group: 'hero',
      initialValue: 'If you are experiencing any technical issues with our website or application, please let us know. This support channel is strictly for website technical issues, not for nutrition consultation.',
    }),
    
    // Form Settings
    defineField({
      name: 'formHeading',
      title: 'Form Heading',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Report an Issue',
    }),
    defineField({
      name: 'formDescription',
      title: 'Form Description',
      type: 'text',
      group: 'formSettings',
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Send',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Support request sent successfully! We will get back to you soon.',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Error Message',
      type: 'string',
      group: 'formSettings',
      initialValue: 'Something went wrong. Please try again.',
    }),

    // Help Section
    defineField({
      name: 'helpSectionHeading1',
      title: 'Help Section Heading 1 (Direct Contact)',
      type: 'string',
      group: 'helpSection',
      initialValue: 'Direct Contact',
    }),
    defineField({
      name: 'helpSectionHeading2',
      title: 'Help Section Heading 2 (Response Time)',
      type: 'string',
      group: 'helpSection',
      initialValue: 'Response Time',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Support Page Configuration' }
    }
  }
})
