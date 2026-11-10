import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'bookConsultationPage',
  title: 'Book Consultation Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero Section' },
    { name: 'booking', title: 'Booking Section' },
    { name: 'chat', title: 'Chat Section' },
  ],
  fields: [
    // Hero
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      group: 'hero',
      initialValue: 'Book your Consultation',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      group: 'hero',
      initialValue: 'Take the first step towards better health. Schedule an initial consultation to discuss your specific needs and goals.',
    }),
    
    // Booking
    defineField({
      name: 'unavailableMessage',
      title: 'Unavailable Message',
      type: 'text',
      group: 'booking',
      description: 'Message shown if the booking widget is not configured or fails to load.',
      initialValue: 'Booking system is currently being configured. Please check back later or contact us directly.',
    }),

    // Chat
    defineField({
      name: 'chatHeading',
      title: 'Chat Heading',
      type: 'string',
      group: 'chat',
      initialValue: 'Prefer to chat first?',
    }),
    defineField({
      name: 'chatDescription',
      title: 'Chat Description',
      type: 'text',
      group: 'chat',
      initialValue: 'If you have questions before booking, feel free to reach out directly via WhatsApp.',
    }),
    defineField({
      name: 'chatButtonText',
      title: 'Chat Button Text',
      type: 'string',
      group: 'chat',
      initialValue: 'Chat on WhatsApp',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Book Consultation Page Configuration' }
    }
  }
})
