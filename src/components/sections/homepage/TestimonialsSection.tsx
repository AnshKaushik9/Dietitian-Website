import { TestimonialCard } from "@/components/shared/Cards"

export function TestimonialsSection({ data }: { data: any }) {
  if (!data?.testimonials || data.testimonials.length === 0) return null

  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            {data.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {data.testimonials.map((testimonial: any) => (
            <TestimonialCard
              key={testimonial._id}
              clientName={testimonial.clientName}
              isAnonymous={testimonial.isAnonymous}
              quote={testimonial.quote}
              mediaType={testimonial.mediaType}
              mediaFile={testimonial.mediaFile}
              condition={testimonial.conditionCategory?.title}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
