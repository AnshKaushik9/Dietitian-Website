import Image from "next/image"
import { urlForImage } from "@/sanity/lib/image"

interface SanityImageProps {
  image: any
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
}

export function SanityImage({
  image,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
}: SanityImageProps) {
  if (!image?.asset) return null

  const url = urlForImage(image)?.url()
  if (!url) return null

  return (
    <Image
      src={url}
      alt={alt}
      width={fill ? undefined : (width || 800)}
      height={fill ? undefined : (height || 600)}
      className={className}
      priority={priority}
      fill={fill}
      sizes={sizes || (fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined)}
      decoding={priority ? "sync" : "async"}
    />
  )
}
