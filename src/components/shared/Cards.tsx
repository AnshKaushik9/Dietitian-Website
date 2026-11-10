 
"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import { CTAButton } from "./Buttons"
import { SanityImage } from "./SanityImage"

// FeatureCard for "Why Choose Me"
export function FeatureCard({ title }: { title: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex items-start gap-4 p-8 bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex-shrink-0 mt-1">
        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary">
          <Check className="w-4 h-4" />
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-foreground">{title}</h4>
      </div>
    </motion.div>
  )
}

// ConditionCard for "Conditions Treated"
export function ConditionCard({
  title,
  shortDescription,
  icon,
}: {
  title: string
  shortDescription: string
  icon?: any
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex flex-col gap-4 p-8 bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-xl transition-all duration-300"
    >
      {icon ? (
        <div className="w-12 h-12 relative flex-shrink-0">
          <SanityImage image={icon} alt={title} fill className="object-contain" />
        </div>
      ) : (
        <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center flex-shrink-0">
          <Check className="w-6 h-6" />
        </div>
      )}
      <div>
        <h4 className="text-xl font-semibold mb-2 text-foreground">{title}</h4>
        <p className="text-muted-foreground text-sm line-clamp-3">{shortDescription}</p>
      </div>
    </motion.div>
  )
}

// ServiceCard for "Services Preview"
export function ServiceCard({
  title,
  shortDescription,
  image,
  slug,
}: {
  title: string
  shortDescription?: string
  image?: any
  slug: string
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex flex-col overflow-hidden bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-xl transition-all duration-300 h-full"
    >
      <div className="w-full aspect-[4/3] relative bg-muted">
        {image && (
          <SanityImage image={image} alt={title} fill className="object-cover" />
        )}
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <h4 className="text-2xl font-semibold mb-3 text-foreground line-clamp-2">{title}</h4>
        {shortDescription && (
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
            {shortDescription}
          </p>
        )}
        <div className="mt-auto">
          <CTAButton href={`/services/${slug}`} className="w-full justify-between group">
            Read More
          </CTAButton>
        </div>
      </div>
    </motion.div>
  )
}

// StatisticCard for "Credentials"
export function StatisticCard({ value, label }: { value: string | number; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex flex-col items-center justify-center p-8 bg-card rounded-2xl shadow-sm border border-border/50 text-center hover:shadow-xl transition-all duration-300 h-full w-full"
    >
      <div className="text-4xl font-heading font-bold text-primary mb-2">
        {value}
      </div>
      <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  )
}

// StepCard for "Consultation Process"
export function StepCard({ title, description, stepNumber, icon }: { title: string, description: string, stepNumber: number, icon?: any }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="relative flex flex-col p-8 bg-card rounded-2xl shadow-sm border border-border/50 transition-all duration-300 h-full z-10 hover:shadow-xl"
    >
      <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-md">
        {stepNumber}
      </div>
      {icon && (
        <div className="w-12 h-12 relative mb-4">
          <SanityImage image={icon} alt={title} fill className="object-contain" />
        </div>
      )}
      <h4 className="text-xl font-semibold mb-3 text-foreground mt-2">{title}</h4>
      <p className="text-muted-foreground text-sm">{description}</p>
    </motion.div>
  )
}

// BlogCard for "Blog Preview"
export function BlogCard({
  title,
  excerpt,
  image,
  slug,
  date,
  category
}: {
  title: string
  excerpt?: string
  image?: any
  slug: string
  date: string
  category?: string
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex flex-col overflow-hidden bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-xl transition-all duration-300 h-full"
    >
      <div className="w-full aspect-video relative bg-muted">
        {image ? (
          <SanityImage image={image} alt={title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">No Image</div>
        )}
      </div>
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
          <span>{category || 'Article'}</span>
          <span>{format(new Date(date), 'dd MMM yyyy')}</span>
        </div>
        <h4 className="text-2xl font-semibold mb-3 text-foreground line-clamp-2">{title}</h4>
        {excerpt && (
          <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
            {excerpt}
          </p>
        )}
        <div className="mt-auto">
          <CTAButton href={`/blog/${slug}`} className="w-full justify-between group">
            Read More
          </CTAButton>
        </div>
      </div>
    </motion.div>
  )
}

// TestimonialCard
export function TestimonialCard({
  clientName,
  isAnonymous,
  quote,
  mediaType,
  mediaFile,
  condition
}: {
  clientName: string
  isAnonymous?: boolean
  quote: string
  mediaType?: string
  mediaFile?: any
  condition?: string
}) {
  const displayName = isAnonymous ? "Anonymous Client" : clientName
  const showPhoto = mediaType === 'photo' && mediaFile
  const showBeforeAfter = mediaType === 'beforeAfter' && mediaFile

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex flex-col p-8 bg-card rounded-2xl shadow-sm border border-border/50 hover:shadow-xl transition-all duration-300 h-full relative"
    >
      <div className="absolute top-6 right-6 opacity-10">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.017 21L16.41 14.392C16.924 13.064 17.5 12.064 18.143 11.392C18.785 10.72 19.642 10.163 20.714 9.721L21 9.614C21 8.843 20.743 8.164 20.229 7.578C19.714 6.993 19.043 6.7 18.214 6.7C17.3 6.7 16.486 7.107 15.771 7.921C15.057 8.736 14.7 9.871 14.7 11.328C14.7 11.971 14.814 12.636 15.043 13.321L14.017 21ZM5.017 21L7.41 14.392C7.924 13.064 8.5 12.064 9.143 11.392C9.785 10.72 10.642 10.163 11.714 9.721L12 9.614C12 8.843 11.743 8.164 11.229 7.578C10.714 6.993 10.043 6.7 9.214 6.7C8.3 6.7 7.486 7.107 6.771 7.921C6.057 8.736 5.7 9.871 5.7 11.328C5.7 11.971 5.814 12.636 6.043 13.321L5.017 21Z" />
        </svg>
      </div>
      
      {showBeforeAfter && (
        <div className="w-full aspect-video relative rounded-md overflow-hidden mb-6 bg-muted">
          <SanityImage image={mediaFile} alt="Before and After" fill className="object-cover" />
        </div>
      )}
      
      <p className="text-muted-foreground italic mb-6 relative z-10 flex-grow">
        "{quote}"
      </p>
      
      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border">
        {showPhoto ? (
          <div className="w-12 h-12 relative rounded-full overflow-hidden bg-muted flex-shrink-0">
            <SanityImage image={mediaFile} alt={displayName} fill className="object-cover" />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-accent text-primary flex items-center justify-center flex-shrink-0 font-semibold">
            {displayName.charAt(0)}
          </div>
        )}
        <div>
          <h5 className="font-semibold text-foreground text-sm">{displayName}</h5>
          {condition && (
            <span className="text-xs text-muted-foreground">{condition}</span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

