"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AnimatedButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  href?: string
}

import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export function CTAButton({ href, children, className, ...props }: AnimatedButtonProps) {
  const content = (
    <Button 
      variant="default" 
      size="lg" 
      className={cn(
        "rounded-2xl h-14 px-8 font-bold text-base md:text-lg",
        "shadow-lg shadow-primary/20",
        "transition-all duration-250 ease-out",
        "hover:-translate-y-1 hover:brightness-110 hover:shadow-xl hover:shadow-primary/40",
        className
      )}
      {...props}
    >
      {children}
      <ArrowRight className="w-5 h-5 ml-2.5 opacity-80 group-hover:translate-x-1 transition-transform" />
    </Button>
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          {content}
        </motion.div>
      </Link>
    )
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="inline-block">
      {content}
    </motion.div>
  )
}

export function GhostButton({ href, ...props }: AnimatedButtonProps) {
  const content = (
    <Button variant="ghost" size="lg" className="border border-border" {...props} />
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          {content}
        </motion.div>
      </Link>
    )
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      {content}
    </motion.div>
  )
}

export function OutlineButton({ href, ...props }: AnimatedButtonProps) {
  const content = (
    <Button 
      variant="secondary" 
      size="lg" 
      {...props} 
    />
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
          {content}
        </motion.div>
      </Link>
    )
  }

  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      {content}
    </motion.div>
  )
}
