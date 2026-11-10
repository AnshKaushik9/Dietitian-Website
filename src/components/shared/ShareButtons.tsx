'use client'

import { Link } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { toast } from 'sonner'
import { useEffect, useState } from 'react'

export function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const timer = setTimeout(() => setUrl(window.location.href), 0)
      return () => clearTimeout(timer)
    }
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    toast.success('Link copied to clipboard')
  }

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground mr-2">Share:</span>
      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
        Twitter
      </a>
      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
        LinkedIn
      </a>
      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
        Facebook
      </a>
      <Button variant="outline" size="icon" onClick={copyToClipboard} aria-label="Copy link">
        <Link className="h-4 w-4" />
      </Button>
    </div>
  )
}
