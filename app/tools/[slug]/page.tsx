'use client';

import { use } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ToolDetailsHeader } from "@/components/tool-details-header";
import { ToolFeatures } from "@/components/tool-features";
import { ToolPricing } from "@/components/tool-pricing";
import { ToolTestimonials } from "@/components/tool-testimonials";
import { RelatedTools } from "@/components/related-tools";
import { useEffect, useState } from "react";
import { Sparkles, Terminal, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

// Types for our tool data
interface ToolData {
  slug: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  rating: number;
  reviews: number;
  website: string;
  features?: string[];
  pricing?: any[];
  testimonials?: any[];
  description_full: string;
  image: string;
}

export default function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [tool, setTool] = useState<ToolData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTool() {
      try {
        const res = await fetch('/api/content');
        const data = await res.json();
        const foundTool = data.tools.find((t: any) => t.slug === slug);
        
        if (foundTool) {
          setTool(foundTool);
        }
      } catch (e) {
        console.error("Error fetching tool:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchTool();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-24">
          <div className="animate-pulse text-foreground/50">Loading tool details...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="flex items-center justify-center py-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">Tool not found</h1>
            <p className="mt-4 text-foreground/70">The tool you&apos;re looking for ({slug}) doesn&apos;t exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Big Hero Section */}
        <ToolDetailsHeader tool={{
          ...tool,
          description_full: tool.description_full || tool.description,
          rating: tool.rating || 4.8,
          reviews: tool.reviews || 0
        }} />

        {/* Bestie Review Section (Placeholder) */}
        <section className="bg-accent/5 py-24 border-y border-border/40">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="h-16 w-16 rounded-full bg-accent flex items-center justify-center text-accent-foreground shadow-xl shadow-accent/20">
                <Sparkles className="h-8 w-8" />
              </div>
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter lowercase italic">
                  kenapa tools ini <span className="text-accent underline decoration-wavy underline-offset-8">sakti banget?</span>
                </h2>
                <p className="text-xl text-foreground/60 max-w-2xl mx-auto font-medium lowercase">
                  review jujur dari tim baruajajadi buat kamu para pejuang cuan.
                </p>
              </div>

              <Card className="w-full rounded-[3rem] border-border bg-white shadow-2xl p-10 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 text-accent/10">
                  <Terminal className="h-32 w-32" />
                </div>
                <div className="relative z-10 space-y-6 text-left">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-slate-200 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="Reviewer" />
                    </div>
                    <div>
                      <p className="font-bold text-foreground">Admin BaruAjaJadi</p>
                      <p className="text-xs text-muted-foreground">Certified Tools Specialist</p>
                    </div>
                  </div>
                  <blockquote className="text-2xl font-black leading-tight italic text-foreground tracking-tight">
                    "Tools ini beneran game-changer buat workflow admin gue. yang tadinya butuh 2 jam buat rekap, sekarang tinggal sat-set 5 menit kelar. wajib punya kalo gamau boncos waktu!"
                  </blockquote>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {tool.features && tool.features.length > 0 && <ToolFeatures features={tool.features} />}
        {tool.pricing && tool.pricing.length > 0 && <ToolPricing pricing={tool.pricing} />}
        {tool.testimonials && tool.testimonials.length > 0 && <ToolTestimonials testimonials={tool.testimonials} />}
        
        <div className="py-24">
          <RelatedTools currentToolId={tool.slug} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
