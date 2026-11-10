import { Metadata } from 'next'
import { SectionContainer } from '@/components/shared/SectionContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ContactForm } from '@/components/shared/ContactForm'
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react'
import { sanityFetch } from '@/sanity/lib/client'
import { settingsQuery, contactPageQuery } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Contact Us | Clinical Dietitian',
  description: 'Get in touch to schedule a consultation or ask a question.',
}

export default async function ContactPage() {
  const settings = await sanityFetch<any>({ query: settingsQuery })
  const pageData = await sanityFetch<any>({ query: contactPageQuery })

  return (
    <main className="flex-1 bg-muted/30">
      <SectionContainer className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start w-full mx-auto">
          {/* Left Column: Info */}
          <div>
            <SectionHeading
              title={pageData?.heroHeading || "Get in Touch"}
              subtitle={pageData?.heroSubtitle || "Whether you're ready to start your journey or just have a few questions, we're here to help."}
              align="left"
            />

            <div className="mt-12 space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Phone</h4>
                  <p className="text-muted-foreground">{settings?.primaryPhone || "+1 (555) 123-4567"}</p>
                  <p className="text-sm text-muted-foreground mt-1">{settings?.businessHours || "Mon-Sun from 10am to 7pm."}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Email</h4>
                  <p className="text-muted-foreground">{settings?.primaryEmail || "hello@dietitian.com"}</p>
                  <p className="text-sm text-muted-foreground mt-1">We aim to respond within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">WhatsApp</h4>
                  <p className="text-muted-foreground">+{settings?.whatsappNumber || "1 (123) 456-7890"}</p>
                  <p className="text-sm text-muted-foreground mt-1">Quick replies for general inquiries.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full text-primary mt-1">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-1">Business Address</h4>
                  <p className="text-muted-foreground">{settings?.businessAddress || "100% Online Consultations"}</p>
                  <p className="text-sm text-muted-foreground mt-1">Accessible from anywhere in the world.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Form */}
          <div className="bg-background p-1 rounded-2xl shadow-xl border">
            <ContactForm
              accessKey={process.env.WEB3FORMS_ACCESS_KEY || ''}
              submitButtonText={pageData?.submitButtonText}
              successMessage={pageData?.successMessage}
              errorMessage={pageData?.errorMessage}
              formHeading={pageData?.formHeading}
              formDescription={pageData?.formDescription}
            />
          </div>
        </div>
      </SectionContainer>
    </main>
  )
}
