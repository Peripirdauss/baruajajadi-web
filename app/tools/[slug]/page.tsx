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
        const res = await fetch('/perip/api/content');
        const data = await res.json();
        const foundTool = data.tools.find((t: any) => t.slug === slug);
        
        if (foundTool) {
          // Add default values for missing fields to maintain UI consistency
          setTool({
            ...foundTool,
            rating: foundTool.rating || 4.5,
            reviews: foundTool.reviews || 120,
            website: foundTool.website || "https://example.com",
            features: foundTool.features || [
              "Advanced analytics and reporting",
              "Real-time collaboration tools",
              "Customizable workflows",
              "Priority customer support"
            ],
            pricing: foundTool.pricing || [
              { plan: "Starter", price: "Free", features: ["Basic features", "Community support"] },
              { plan: "Pro", price: "$19/mo", features: ["All features", "Priority support"] }
            ],
            testimonials: foundTool.testimonials || [
              { author: "John Doe", role: "Developer", company: "Tech Inc", quote: "This tool changed my life!" }
            ],
            description_full: foundTool.description_full || foundTool.description,
            image: foundTool.image || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop"
          });
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
        <ToolDetailsHeader tool={tool} />
        <ToolFeatures features={tool.features || []} />
        <ToolPricing pricing={tool.pricing || []} />
        <ToolTestimonials testimonials={tool.testimonials || []} />
        <RelatedTools currentToolId={tool.slug} />
      </main>
      <Footer />
    </div>
  );
}
