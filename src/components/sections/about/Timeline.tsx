'use client'

import { motion } from 'framer-motion'
import { SectionContainer } from '@/components/shared/SectionContainer'
import { SectionHeading } from '@/components/shared/SectionHeading'

interface TimelineItem {
  _key: string
  year: string
  role: string
  company: string
  description: string
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  if (!items || items.length === 0) return null

  return (
    <SectionContainer className="bg-muted/50 py-16">
      <SectionHeading 
        title="My Experience" 
        subtitle="A journey dedicated to clinical excellence and personalized care."
      />
      <div className="mt-12 max-w-3xl mx-auto">
        <div className="relative border-l border-primary/20 ml-4 md:ml-0">
          {items.map((item, index) => (
            <motion.div
              key={item._key}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-10 ml-8 md:ml-12 relative"
            >
              <span className="absolute -left-10 md:-left-14 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary ring-4 ring-background" />
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-xl font-heading font-semibold">{item.role}</h3>
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">
                  {item.year}
                </span>
              </div>
              <h4 className="text-muted-foreground font-medium mb-3">{item.company}</h4>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
