import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

const relatedToolsData: Record<string, any[]> = {
  figma: [
    { id: "framer", name: "Framer", category: "Design", rating: 4.7, reviews: 1800 },
    { id: "json-formatter", name: "JSON Formatter", category: "Tools", rating: 4.9, reviews: 3200 }
  ],
  framer: [
    { id: "figma", name: "Figma", category: "Design", rating: 4.8, reviews: 2500 },
    { id: "json-formatter", name: "JSON Formatter", category: "Tools", rating: 4.9, reviews: 3200 }
  ],
  "json-formatter": [
    { id: "figma", name: "Figma", category: "Design", rating: 4.8, reviews: 2500 },
    { id: "framer", name: "Framer", category: "Design", rating: 4.7, reviews: 1800 }
  ]
};

interface RelatedToolsProps {
  currentToolId: string;
}

export function RelatedTools({ currentToolId }: RelatedToolsProps) {
  const related = relatedToolsData[currentToolId] || [];

  if (related.length === 0) return null;

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground">Related Tools</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Explore similar tools that might interest you
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {related.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.id}`}
              className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-foreground/60 mt-1">{tool.category}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-foreground/40 group-hover:text-accent transition-colors" />
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-border">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3 w-3 fill-accent text-accent"
                    />
                  ))}
                </div>
                <span className="text-xs text-foreground/60">
                  {tool.rating} ({tool.reviews.toLocaleString()})
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
