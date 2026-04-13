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
        <ToolDetailsHeader tool={{
          ...tool,
          description_full: tool.description_full || tool.description,
          rating: tool.rating || 4.8,
          reviews: tool.reviews || 0
        }} />
        {tool.features && tool.features.length > 0 && <ToolFeatures features={tool.features} />}
        {tool.pricing && tool.pricing.length > 0 && <ToolPricing pricing={tool.pricing} />}
        {tool.testimonials && tool.testimonials.length > 0 && <ToolTestimonials testimonials={tool.testimonials} />}
        <RelatedTools currentToolId={tool.slug} />
      </main>
      <Footer />
    </div>
  );
}
