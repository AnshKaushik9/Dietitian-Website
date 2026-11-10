import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PortableText } from "next-sanity"

export function FAQSection({ data }: { data: any }) {
  if (!data?.faqs || data.faqs.length === 0) return null

  return (
    <section className="py-24 md:py-32 bg-muted/20">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32 mb-8 lg:mb-0">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 tracking-tight leading-tight">
              {data.title ? (
                data.title.split(' ').map((word: string, i: number, arr: any[]) => {
                  const isQuestions = word.toLowerCase().includes('questions')
                  return (
                    <span key={i} className={isQuestions ? "text-primary" : ""}>
                      {word}{i !== arr.length - 1 ? ' ' : ''}
                    </span>
                  )
                })
              ) : "Frequently Asked Questions"}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Find answers to common questions about our clinical nutrition protocols, consultation process, and holistic approach to wellness.
            </p>
          </div>

          <div className="lg:col-span-7">
            <Accordion className="w-full space-y-5">
              {data.faqs.map((faq: any, index: number) => (
                <AccordionItem
                  key={faq._id}
                  value={`item-${index}`}
                  className="bg-card px-6 sm:px-8 py-3 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 data-[state=open]:shadow-md data-[state=open]:border-primary/20"
                >
                  <AccordionTrigger className="text-lg sm:text-xl font-semibold hover:no-underline hover:text-primary transition-colors py-4 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground prose prose-base sm:prose-lg max-w-none pb-6 pt-2">
                    <PortableText value={faq.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
