import { StepCard } from "@/components/shared/Cards"

export function ConsultationProcessSection({ data }: { data: any }) {
  if (!data?.steps || data.steps.length === 0) return null

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-lg text-muted-foreground">{data.subtitle}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {data.steps.map((step: any, index: number) => (
            <div key={step._key} className="relative">
              {/* Optional connector line for large screens */}
              {index < data.steps.length - 1 && (
                <div className="hidden xl:block absolute top-12 left-[60%] w-full h-[2px] bg-border z-0" />
              )}
              <StepCard
                title={step.title}
                description={step.description}
                stepNumber={index + 1}
                icon={step.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
