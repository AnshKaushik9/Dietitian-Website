 
"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { SectionContainer } from "@/components/shared/SectionContainer"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { StatisticCard } from "@/components/shared/Cards"
import { SanityImage } from "@/components/shared/SanityImage"

interface CredentialsSectionProps {
  title?: string
  yearsOfExperience?: number
  qualification?: string
  certifications?: string
  patientsGuided?: number
  evidenceBasedApproach?: boolean
  logos?: any[]
}

export function CredentialsSection({
  title,
  yearsOfExperience,
  qualification,
  certifications,
  patientsGuided,
  evidenceBasedApproach,
  logos,
}: CredentialsSectionProps) {
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
          title={title || "Trusted by Patients & Healthcare Professionals"}
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 lg:gap-10"
        >
          {yearsOfExperience && (
            <motion.div variants={itemVariants} className="h-full">
              <StatisticCard value={`${yearsOfExperience}+`} label="Years Experience" />
            </motion.div>
          )}
          {patientsGuided && (
            <motion.div variants={itemVariants} className="h-full">
              <StatisticCard value={`${patientsGuided}+`} label="Patients Guided" />
            </motion.div>
          )}
          {qualification && (
            <motion.div variants={itemVariants} className="h-full">
              <StatisticCard value={qualification} label="Qualification" />
            </motion.div>
          )}
          {certifications && (
            <motion.div variants={itemVariants} className="h-full">
              <StatisticCard value="Certified" label={certifications} />
            </motion.div>
          )}
          {evidenceBasedApproach && (
            <motion.div variants={itemVariants} className="h-full">
              <StatisticCard value="100%" label="Evidence-Based" />
            </motion.div>
          )}
        </motion.div>

        {logos && logos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-border flex flex-wrap justify-center gap-8 md:gap-16 opacity-70"
          >
            {logos.map((logo, index) => (
              <div key={index} className="relative h-12 w-32 grayscale hover:grayscale-0 transition-all duration-300">
                <SanityImage image={logo} alt={`Partner Logo ${index + 1}`} fill className="object-contain" />
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </SectionContainer>
  )
}
