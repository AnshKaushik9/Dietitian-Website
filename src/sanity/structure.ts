import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.listItem()
        .title('Homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('homepage')
        ),
      S.listItem()
        .title('Contact Page')
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
        ),
      S.listItem()
        .title('Support Page')
        .child(
          S.document()
            .schemaType('supportPage')
            .documentId('supportPage')
        ),
      S.listItem()
        .title('Book Consultation Page')
        .child(
          S.document()
            .schemaType('bookConsultationPage')
            .documentId('bookConsultationPage')
        ),
      S.listItem()
        .title('Success Stories Page')
        .child(
          S.document()
            .schemaType('successStoriesPage')
            .documentId('successStoriesPage')
        ),
      S.divider(),
      S.documentTypeListItem('service').title('Services'),
      S.documentTypeListItem('condition').title('Conditions'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
      S.documentTypeListItem('faq').title('FAQs'),
      S.documentTypeListItem('page').title('Generic Pages'),
      S.divider(),
      S.listItem()
        .title('Site Navigation')
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('navigation')
        ),
      S.divider(),
      S.listItem()
        .title('Blog')
        .child(
          S.list()
            .title('Blog')
            .items([
              S.documentTypeListItem('post').title('Posts'),
              S.documentTypeListItem('category').title('Categories'),
              S.documentTypeListItem('author').title('Authors'),
            ])
        ),
    ])
