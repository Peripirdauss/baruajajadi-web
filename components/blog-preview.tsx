'use client';

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Calendar, Clock, User } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
}

export function BlogPreview() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/content');
        const data = await res.json();
        setPosts(data.blog || []);
      } catch (e) {
        console.error('Error fetching blog posts:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  if (loading || posts.length === 0) {
    return null; // Or a skeleton
  }

  return (
    <section id="blog" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 space-y-4">
          <div className="inline-block rounded-full bg-accent/10 px-4 py-2">
            <span className="text-sm font-semibold text-accent">Latest Articles</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
            Insights & Knowledge
          </h2>
          <p className="max-w-2xl text-lg text-foreground/70">
            Deep dives into technology, design, and development with practical tips and industry insights.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Featured Post */}
          {posts[0] && (
            <Link
              href={`/blog/${posts[0].slug}`}
              className="group relative rounded-2xl border border-border overflow-hidden bg-card transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img 
                  src={posts[0].image} 
                  alt={posts[0].title}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {posts[0].category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {posts[0].title}
                </h3>
                <p className="text-foreground/70">
                  {posts[0].excerpt}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-foreground/60 border-t border-border pt-4">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    {posts[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    {posts[0].date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {posts[0].readTime}
                  </div>
                </div>
                <div className="text-sm font-semibold text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  Read Article →
                </div>
              </div>
            </Link>
          )}

          {/* Recent Posts */}
          <div className="space-y-4">
            {posts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-foreground/70 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex gap-3 text-xs text-foreground/60">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
          <Button size="lg" variant="outline" asChild className="rounded-2xl h-14 px-10 font-black border-accent/20 hover:border-accent hover:bg-accent/5 active:scale-95 transition-all shadow-sm">
            <Link href="/blog">View All Articles →</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
