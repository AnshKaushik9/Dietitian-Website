import * as React from "react"
import { cn } from "@/lib/utils"

export interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  containerClassName?: string
}

export function SectionContainer({
  children,
  className,
  containerClassName,
  ...props
}: SectionContainerProps) {
  return (
    <section className={cn("w-full py-20 md:py-28 lg:py-32", className)} {...props}>
      <div className={cn("container mx-auto", containerClassName)}>
        {children}
      </div>
    </section>
  )
}
