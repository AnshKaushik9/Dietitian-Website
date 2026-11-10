import { buttonVariants } from "@/components/ui/button"

import { CTAButton } from '@/components/shared/Buttons'
import Link from 'next/link'
import { MessageCircle } from "lucide-react"

export function CTABannerSection({ data }: { data: any }) {
  if (!data) return null

  return (
    <section className="py-28 relative overflow-hidden bg-gradient-to-br from-primary/5 via-primary/10 to-accent/30 text-foreground border-t border-primary/10">
      {/* Premium organic abstract shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[30%] -left-[10%] w-[60%] h-[160%] rounded-[100%] bg-gradient-to-br from-primary/10 to-transparent blur-[80px] opacity-70 transform rotate-12" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[140%] rounded-[100%] bg-gradient-to-tl from-primary/15 to-transparent blur-[80px] opacity-60 transform -rotate-12" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground tracking-tight">
              {data.headline}
            </h2>
            
            {data.subheadline && (
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {data.subheadline}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
            {data.cta?.link && (
              <CTAButton href={data.cta.link} className="w-full sm:w-auto">
                {data.cta.label || "Book your Consultation"}
              </CTAButton>
            )}
            
            {data.secondaryCta?.link && (
              <Link 
                href={data.secondaryCta.link} 
                className={buttonVariants({ 
                  variant: "secondary", 
                  size: "lg", 
                  className: "w-full sm:w-auto font-semibold text-lg px-8 h-14" 
                })}
              >
                <MessageCircle className="mr-2 h-6 w-6" />
                {data.secondaryCta.label || "Chat on WhatsApp"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

