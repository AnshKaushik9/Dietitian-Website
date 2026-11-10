 
"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { SectionContainer } from "@/components/shared/SectionContainer"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { FeatureCard } from "@/components/shared/Cards"
import { SanityImage } from "@/components/shared/SanityImage"
import { PortableText } from "next-sanity"

interface WhyChooseMeSectionProps {
  title?: string
  description?: any
  bulletPoints?: string[]
  image?: any
}

export function WhyChooseMeSection({
  title,
  description,
  bulletPoints,
  image,
}: WhyChooseMeSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <SectionContainer className="bg-background">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          className="relative h-[500px] lg:h-[700px] w-full rounded-2xl overflow-hidden shadow-lg order-2 lg:order-1"
        >
          {image ? (
            <SanityImage image={image} alt="Why Choose Me" fill className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-muted flex items-center justify-center text-muted-foreground font-medium text-lg">
              [Professional Placeholder Image]
            </div>
          )}
        </motion.div>

        <div className="flex flex-col gap-8 order-1 lg:order-2">
          <SectionHeading badge="Why Choose Me" title={title || "A Holistic, Evidence-Based Approach"} />
          
          {description && (
            <div className="prose prose-lg text-muted-foreground max-w-none">
              <PortableText value={description} />
            </div>
          )}

          {bulletPoints && bulletPoints.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="grid sm:grid-cols-2 gap-4 mt-4"
            >
              {bulletPoints.map((point, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <FeatureCard title={point} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </SectionContainer>
  )
}
