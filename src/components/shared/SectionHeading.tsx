import * as React from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string
  title: string
  subtitle?: string
  align?: "left" | "center"
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-3xl" : "items-start",
        className
      )}
      {...props}
    >
      {badge && <Badge variant="brand">{badge}</Badge>}
      <h2 className="text-3xl font-heading font-medium tracking-tight sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground leading-relaxed max-w-[720px]">
          {subtitle}
        </p>
      )}
    </div>
  )
}
