import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';

interface ArticleCardProps {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export function ArticleCard({
  slug,
  title,
  excerpt,
  category,
  author,
  date,
  readTime,
  image,
}: ArticleCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-accent hover:shadow-lg">
        {/* Image */}
        <div className="overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
          <img
            src={image}
            alt={title}
            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-6">
          {/* Category Badge */}
          <div className="inline-flex w-fit">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-balance text-xl font-bold text-foreground group-hover:text-accent">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="flex-1 text-foreground/60 line-clamp-2">{excerpt}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-foreground/50">
            <div className="flex items-center gap-1">
              <User className="size-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="size-4" />
              <span>{date}</span>
            </div>
            <span>{readTime} min read</span>
          </div>

          {/* Read More Link */}
          <div className="flex items-center gap-2 text-accent transition-all group-hover:gap-3">
            <span className="text-sm font-semibold">Read Article</span>
            <ArrowRight className="size-4" />
          </div>
        </div>
      </article>
    </Link>
  );
}
