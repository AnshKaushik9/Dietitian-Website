'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { BlogCard } from '@/components/shared/Cards'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  mainImage?: any
  publishedAt?: string
  excerpt?: string
  author?: { name: string; image?: any }
  categories?: { title: string }[]
}

export function BlogSearch({ posts, categories }: { posts: Post[], categories: string[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (post.excerpt?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory ? post.categories?.some(c => c.title === activeCategory) : true
    return matchesSearch && matchesCategory
  })

  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={activeCategory === null ? 'default' : 'outline'} 
            onClick={() => setActiveCategory(null)}
            size="sm"
          >
            All
          </Button>
          {categories.map(cat => (
            <Button 
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'} 
              onClick={() => setActiveCategory(cat)}
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search articles..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredPosts.map(post => (
            <motion.div
              key={post._id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <BlogCard
                title={post.title}
                excerpt={post.excerpt}
                date={post.publishedAt || ''}
                category={post.categories?.[0]?.title}
                slug={post.slug.current}
                image={post.mainImage}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {filteredPosts.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-xl font-heading mb-2">No articles found</h3>
          <p className="text-muted-foreground">Try adjusting your search or category filter.</p>
        </div>
      )}
    </div>
  )
}
