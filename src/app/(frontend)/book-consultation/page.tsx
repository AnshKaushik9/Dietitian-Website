import { SectionContainer } from '@/components/shared/SectionContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { buttonVariants } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { CalWidget } from '@/components/shared/CalWidget'
import { Metadata } from 'next'
import { sanityFetch } from '@/sanity/lib/client'
import { settingsQuery, bookConsultationPageQuery } from '@/sanity/lib/queries'

export const metadata: Metadata = {
  title: 'Book your Consultation | Clinical Dietitian',
  description: 'Take the first step towards better health by scheduling an initial consultation.',
}

export default async function BookConsultationPage() {
  const settings = await sanityFetch<any>({ query: settingsQuery })
  const pageData = await sanityFetch<any>({ query: bookConsultationPageQuery })
  const calcomUrl = settings?.calcomUrl || process.env.CALCOM_LINK || ''
  const whatsappNumber = settings?.whatsappNumber || "1234567890"
  const defaultMessage = settings?.defaultWhatsappMessage ? `?text=${encodeURIComponent(settings.defaultWhatsappMessage)}` : ""
  
  let parsedCalLink = ''
  if (calcomUrl) {
    try {
      const urlObj = new URL(calcomUrl)
      // Extract path, e.g., "/username" -> "username" or "/username/event" -> "username/event"
      parsedCalLink = urlObj.pathname.replace(/^\/+/, '')
    } catch {
      // Fallback in case the env var is not a full URL but just the identifier
      parsedCalLink = calcomUrl.replace(/^\/+/, '')
    }
  }

  return (
    <main className="flex-1">
      <SectionContainer className="pt-24 pb-16 md:pt-32 md:pb-24 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <SectionHeading 
            title={pageData?.heroHeading || "Book your Consultation"} 
            subtitle={pageData?.heroSubtitle || "Take the first step towards better health. Schedule an initial consultation to discuss your specific needs and goals."} 
            align="center"
          />
        </div>

        <div className="max-w-4xl mx-auto bg-background rounded-2xl shadow-xl overflow-hidden min-h-[600px] relative border">
          {parsedCalLink ? (
            <CalWidget calLink={parsedCalLink} />
          ) : (
            <div className="flex items-center justify-center w-full h-full min-h-[600px] text-muted-foreground p-8 text-center">
              {pageData?.unavailableMessage || "Booking system is currently being configured. Please check back later or contact us directly."}
            </div>
          )}
        </div>

        <div className="max-w-3xl mx-auto mt-16 text-center space-y-6">
          <h3 className="font-heading font-semibold text-2xl">{pageData?.chatHeading || "Prefer to chat first?"}</h3>
          <p className="text-muted-foreground">
            {pageData?.chatDescription || "If you have questions before booking, feel free to reach out directly via WhatsApp."}
          </p>
          <a href={`https://wa.me/${whatsappNumber}${defaultMessage}`} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: 'lg', className: 'gap-2 bg-green-600 hover:bg-green-700 text-white' })}>
            <MessageCircle className="h-5 w-5" />
            {pageData?.chatButtonText || "Chat on WhatsApp"}
          </a>
        </div>
      </SectionContainer>
    </main>
  )
}
