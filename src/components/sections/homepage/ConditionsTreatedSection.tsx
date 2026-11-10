 
"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { SectionContainer } from "@/components/shared/SectionContainer"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { ConditionCard } from "@/components/shared/Cards"

interface ConditionsTreatedSectionProps {
  title?: string
  subtitle?: string
  conditions?: Array<{
    _id: string
    title: string
    slug: { current: string }
    icon?: any
    shortDescription?: string
  }>
}

export function ConditionsTreatedSection({
  title,
  subtitle,
  conditions,
}: ConditionsTreatedSectionProps) {
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
    <SectionContainer className="bg-muted">
      <div className="flex flex-col gap-12">
        <SectionHeading
          badge="Specialties"
          title={title || "Conditions Treated"}
          subtitle={subtitle}
          align="center"
        />

        {conditions && conditions.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {conditions.map((condition) => (
              <motion.div key={condition._id} variants={itemVariants} className="h-full">
                <ConditionCard
                  title={condition.title}
                  shortDescription={condition.shortDescription || ""}
                  icon={condition.icon}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </SectionContainer>
  )
}
