 
import { sanityFetch } from "@/sanity/lib/client"
import { homepageQuery, settingsQuery } from "@/sanity/lib/queries"
import { HeroSection } from "@/components/sections/homepage/HeroSection"
import { CredentialsSection } from "@/components/sections/homepage/CredentialsSection"
import { WhyChooseMeSection } from "@/components/sections/homepage/WhyChooseMeSection"
import { ConditionsTreatedSection } from "@/components/sections/homepage/ConditionsTreatedSection"
import { ServicesPreviewSection } from "@/components/sections/homepage/ServicesPreviewSection"
import { ConsultationProcessSection } from "@/components/sections/homepage/ConsultationProcessSection"
import { TestimonialsSection } from "@/components/sections/homepage/TestimonialsSection"
import { BlogPreviewSection } from "@/components/sections/homepage/BlogPreviewSection"
import { FAQSection } from "@/components/sections/homepage/FAQSection"
import { CTABannerSection } from "@/components/sections/homepage/CTABannerSection"
import { SuccessStoriesSection } from "@/components/sections/homepage/SuccessStoriesSection"

export default async function Home() {
  let data: any = null
  let settings: any = null
  
  try {
    data = await sanityFetch({ query: homepageQuery })
    settings = await sanityFetch({ query: settingsQuery })
  } catch (error) {
    console.error("Failed to fetch Sanity data:", error)
  }

  const sections = data?.sections || []
  
  const whatsappNumber = settings?.whatsappNumber || "1234567890"
  const defaultMessage = settings?.defaultWhatsappMessage ? `?text=${encodeURIComponent(settings.defaultWhatsappMessage)}` : ""
  const whatsappUrl = `https://wa.me/${whatsappNumber}${defaultMessage}`

  return (
    <div className="flex flex-col min-h-screen">
      {sections.map((section: any, index: number) => {
        switch (section._type) {
          case 'heroSection':
            return <HeroSection key={section._key || index} {...section} />
          case 'credentialsSection':
            return <CredentialsSection key={section._key || index} {...section} />
          case 'whyChooseMeSection':
            return <WhyChooseMeSection key={section._key || index} {...section} />
          case 'conditionsTreatedSection':
            return <ConditionsTreatedSection key={section._key || index} {...section} />
          case 'servicesPreviewSection':
            return <ServicesPreviewSection key={section._key || index} {...section} />
          case 'consultationProcessSection':
            return <ConsultationProcessSection key={section._key || index} data={section} />
          case 'testimonialsSection':
            return <TestimonialsSection key={section._key || index} data={section} />
          case 'blogPreviewSection':
            return <BlogPreviewSection key={section._key || index} data={section} />
          case 'faqSection':
            return <FAQSection key={section._key || index} data={section} />
          case 'successStoriesSection':
            return <SuccessStoriesSection key={section._key || index} data={section} />
          case 'ctaBannerSection':
            const ctaProps = { ...section }
            ctaProps.secondaryCta = {
              label: section.secondaryCta?.label || "Chat on WhatsApp",
              link: whatsappUrl
            }
            return <CTABannerSection key={section._key || index} data={ctaProps} />
          default:
            return null
        }
      })}
    </div>
  )
}

