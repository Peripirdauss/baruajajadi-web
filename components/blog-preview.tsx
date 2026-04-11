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
        const res = await fetch('/perip/api/content');
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
    <section id="blog" className="py-24 sm:py-40 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-border/20"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-24 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-black tracking-[0.3em] uppercase">
             Signals / Intel
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tighter text-foreground sm:text-7xl leading-[0.9] uppercase italic">
              Knowledge <br/><span className="text-primary">Transfer</span> <span className="text-muted-foreground/30">&</span> Insights
            </h2>
            <div className="h-1 w-20 bg-primary/20 rounded-full"></div>
          </div>
          <p className="max-w-2xl text-xl text-muted-foreground leading-relaxed font-medium border-l-4 border-accent/20 pl-6">
            Deep technical artifacts and creative strategies extracted from high-performance production environments.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Featured Post */}
          {posts[0] && (
            <Link
              href={`/blog/${posts[0].slug}`}
              className="group relative flex flex-col gap-10 p-2 rounded-[3rem] transition-all duration-700 hover:translate-y-[-8px]"
            >
              <div className="aspect-[16/10] relative overflow-hidden rounded-[2.5rem] bg-slate-100 border border-border group-hover:border-primary/30 transition-all duration-500 shadow-sm group-hover:shadow-[0_40px_80px_-20px_rgba(29,78,216,0.15)]">
                <img 
                  src={posts[0].image} 
                  alt={posts[0].title}
                  className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="space-y-6 px-4">
                <div className="flex items-center gap-3">
                  <span className="px-4 py-1.5 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20">
                    {posts[0].category}
                  </span>
                  <div className="h-px flex-1 bg-border/50"></div>
                </div>
                <h3 className="text-4xl font-black text-foreground group-hover:text-primary transition-all duration-300 tracking-tighter uppercase italic leading-[1.1]">
                  {posts[0].title}
                </h3>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed line-clamp-3">
                  {posts[0].excerpt}
                </p>
                <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40 pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-primary" />
                    {posts[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-primary" />
                    {posts[0].date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-primary" />
                    {posts[0].readTime}
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Recent Posts Side */}
          <div className="space-y-6">
            {posts.slice(1).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col sm:flex-row gap-8 rounded-[2.5rem] border border-transparent bg-white/50 p-6 transition-all duration-500 hover:bg-white hover:border-border hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)]"
              >
                <div className="w-full sm:w-40 h-40 rounded-[1.5rem] overflow-hidden flex-shrink-0 bg-slate-50 border border-border group-hover:border-primary/20 transition-all">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="flex-1 space-y-4 py-2">
                  <div className="space-y-2">
                    <div className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">{post.category}</div>
                    <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-all duration-300 tracking-tight uppercase italic leading-tight">
                      {post.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex gap-4 text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
            
            {/* View All Artifacts Card */}
            <Link
               href="/blog"
               className="group block rounded-[2.5rem] bg-primary p-12 text-center transition-all duration-500 hover:scale-[0.98] shadow-2xl shadow-primary/20 relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="space-y-4">
                   <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Access Full <br />Archive</h3>
                   <div className="flex items-center justify-center gap-3 text-white/60 text-xs font-black uppercase tracking-[0.3em] group-hover:text-white transition-colors">
                      Explore Signals <div className="h-6 w-6 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:border-white transition-all">
                         <div className="h-1 w-1 bg-white rounded-full"></div>
                      </div>
                   </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
