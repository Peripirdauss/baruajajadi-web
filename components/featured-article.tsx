'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';

interface Article {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  featured?: boolean;
}

export function FeaturedArticle() {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch('/api/content');
        const data = await res.json();
        const posts: Article[] = data.blog || [];
        // Pick the one explicitly marked featured, or fall back to first post
        const featured = posts.find((p) => p.featured) || posts[0] || null;
        setArticle(featured);
      } catch (e) {
        console.error('Error fetching featured article:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <div className="grid overflow-hidden rounded-lg border border-border md:grid-cols-2 animate-pulse">
        <div className="aspect-video bg-muted" />
        <div className="p-6 space-y-4">
          <div className="h-4 w-20 rounded bg-muted" />
          <div className="h-6 w-3/4 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-1/2 rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!article) return null;

  return (
    <Link href={`/blog/${article.slug}`}>
      <div className="group grid overflow-hidden rounded-lg border border-border transition-all hover:border-accent hover:shadow-lg md:grid-cols-2">
        <div className="overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
          <img
            src={article.image}
            alt={article.title}
            className="aspect-video h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col justify-between gap-4 p-6 sm:p-8">
          <div className="inline-flex w-fit">
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              Featured
            </span>
          </div>

          <div>
            <h2 className="text-balance text-2xl font-bold text-foreground group-hover:text-accent sm:text-3xl">
              {article.title}
            </h2>
            <p className="mt-3 text-foreground/60">{article.excerpt}</p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/50">
            <div className="flex items-center gap-1">
              <User className="size-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="size-4" />
              <span>{article.date}</span>
            </div>
            {article.readTime && (
              <div className="flex items-center gap-1">
                <Clock className="size-4" />
                <span>{article.readTime}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 font-semibold text-accent transition-all group-hover:gap-3">
            <span>Read Full Article</span>
            <ArrowRight className="size-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
