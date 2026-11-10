import { BlogCard } from "@/components/shared/Cards"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export function BlogPreviewSection({ data }: { data: any }) {
  if (!data?.posts || data.posts.length === 0) return null

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              {data.title}
            </h2>
            {data.subtitle && (
              <p className="text-lg text-muted-foreground">{data.subtitle}</p>
            )}
          </div>
          {data.viewAllCta?.link && (
            <Link href={data.viewAllCta.link} className={buttonVariants({ variant: "default", className: "shrink-0 w-full md:w-auto" })}>
              {data.viewAllCta.label || "View All Articles"}
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {data.posts.map((post: any) => (
            <BlogCard
              key={post._id}
              title={post.title}
              excerpt={post.excerpt}
              image={post.mainImage}
              slug={post.slug?.current}
              date={post.publishedAt}
              category={post.categories?.[0]?.title}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
