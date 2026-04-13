'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ArrowRight, Loader2 } from "lucide-react";

interface RelatedToolsProps {
  currentToolId: string;
}

export function RelatedTools({ currentToolId }: RelatedToolsProps) {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch('/api/content');
        const data = await res.json();
        
        // Find current tool to match category
        const current = data.tools.find((t: any) => t.slug === currentToolId);
        
        // Filter by same category, excluding current tool
        const filtered = data.tools.filter((t: any) => 
          t.slug !== currentToolId && 
          (current ? t.category === current.category : true)
        ).slice(0, 2);

        setTools(filtered);
      } catch (e) {
        console.error("Error fetching related tools:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchRelated();
  }, [currentToolId]);

  if (loading) return null;
  if (tools.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 border-t border-border/50">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground lowercase tracking-tight italic">tools <span className="text-primary">lainnya</span> yang mungkin kamu suka ✨</h2>
          <p className="mt-4 text-lg text-foreground/70 lowercase font-medium">
            cek tools sakti lainnya biar kerjaan kamu makin sat-set & anti ribet.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="group rounded-[2rem] border border-border bg-card p-8 transition-all hover:border-primary/30 hover:shadow-[0_20px_40px_-10px_rgba(29,78,216,0.1)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative space-y-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight lowercase">
                      {tool.name}
                    </h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">{tool.category}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all">
                    <ArrowRight className="h-5 w-5 text-foreground/40 group-hover:text-white transition-colors" />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {tool.description}
                </p>

                <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 fill-primary text-primary opacity-60"
                      />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                    Recommended / Tool
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
