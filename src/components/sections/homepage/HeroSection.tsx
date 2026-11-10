"use client"

import * as React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { SectionContainer } from "@/components/shared/SectionContainer"
import { CTAButton, OutlineButton } from "@/components/shared/Buttons"
import { MessageCircle } from "lucide-react"
import { SanityImage } from "@/components/shared/SanityImage"

interface HeroSectionProps {
  headline?: string
  subheadline?: string
  primaryCta?: { label: string; link: string }
  secondaryCta?: { label: string; link: string }
  backgroundImage?: any
}

export function HeroSection({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  backgroundImage,
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  }

  return (
    <SectionContainer className="relative overflow-hidden bg-background">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-8 z-10 py-12 lg:py-0 lg:col-span-7 lg:pr-8"
        >
          <div className="flex flex-col gap-6">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-heading font-medium tracking-tight text-foreground"
            >
              {headline || "Transform Your Health with Evidence-Based Nutrition"}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              {subheadline ||
                "Personalized, holistic care to help you manage complex conditions and build sustainable wellness habits."}
            </motion.p>
          </div>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 items-center">
            {primaryCta && (
              <CTAButton href={primaryCta.link}>{primaryCta.label}</CTAButton>
            )}
            {secondaryCta && (
              <OutlineButton href={secondaryCta.link}>
                <MessageCircle className="w-5 h-5 mr-2" />
                {secondaryCta.label}
              </OutlineButton>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.3 }}
          className="relative h-[400px] lg:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl lg:col-span-5"
        >
          {backgroundImage ? (
            <SanityImage image={backgroundImage} alt="Hero" fill className="object-cover" priority />
          ) : (
            <div className="absolute inset-0 bg-secondary flex items-center justify-center text-secondary-foreground font-medium text-lg">
              [Professional Placeholder Image]
            </div>
          )}
        </motion.div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
    </SectionContainer>
  )
}
