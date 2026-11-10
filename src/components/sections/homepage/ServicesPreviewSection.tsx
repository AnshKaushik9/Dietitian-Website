 
"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { SectionContainer } from "@/components/shared/SectionContainer"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { ServiceCard } from "@/components/shared/Cards"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"

interface ServicesPreviewSectionProps {
  title?: string
  subtitle?: string
  services?: Array<{
    _id: string
    title: string
    slug: { current: string }
    image?: any
    shortDescription?: string
  }>
}

export function ServicesPreviewSection({
  title,
  subtitle,
  services,
}: ServicesPreviewSectionProps) {
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

  // Ensure maximum 6 cards
  const featuredServices = services?.slice(0, 6)

  return (
    <SectionContainer className="bg-background">
      <div className="flex flex-col gap-12">
        <SectionHeading
          badge="Services"
          title={title || "Specialized Nutrition Services"}
          subtitle={subtitle}
          align="center"
        />

        {featuredServices && featuredServices.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          >
            {featuredServices.map((service) => (
              <motion.div key={service._id} variants={itemVariants} className="h-full">
                <ServiceCard
                  title={service.title}
                  shortDescription={service.shortDescription}
                  image={service.image}
                  slug={service.slug.current}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-4"
        >
          <Link href="/services" className={buttonVariants({ variant: "default", size: "lg", className: "shrink-0" })}>
            View All Services
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </motion.div>
      </div>
    </SectionContainer>
  )
}
