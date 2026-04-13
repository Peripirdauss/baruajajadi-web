'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock } from 'lucide-react';

interface RelatedArticlesProps {
  relatedSlugs: string[];
}

export default function RelatedArticles({ relatedSlugs }: RelatedArticlesProps) {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch('/api/content');
        const data = await res.json();
        
        // Filter articles by the slugs provided in props
        const filtered = data.blog.filter((a: any) => 
          relatedSlugs.includes(a.slug)
        );

        setArticles(filtered);
      } catch (e) {
        console.error("Error fetching related articles:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchRelated();
  }, [relatedSlugs]);

  if (loading || articles.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-16 border-t border-border/50">
      <h3 className="mb-12 text-3xl font-black text-foreground uppercase italic tracking-tighter">Related <span className="text-primary">Artifacts</span> 📂</h3>
      <div className="grid gap-8 md:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group block rounded-[2.5rem] border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative space-y-6">
              <div className="aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-slate-50 border border-border group-hover:border-primary/20 transition-all">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="space-y-4 px-2">
                <div className="flex items-center gap-3">
                  <span className="inline-block text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    {article.category}
                  </span>
                  <div className="h-px flex-1 bg-border/40"></div>
                </div>

                <h4 className="text-xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight uppercase italic leading-tight">
                  {article.title}
                </h4>

                <div className="flex gap-6 text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest pt-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3 text-primary" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-primary" />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
