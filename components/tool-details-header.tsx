import Image from "next/image";
import { Star, ExternalLink, Heart } from "lucide-react";

interface ToolDetailsHeaderProps {
  tool: {
    name: string;
    description: string;
    image: string;
    rating: number;
    reviews: number;
    website: string;
    description_full: string;
  };
}

export function ToolDetailsHeader({ tool }: ToolDetailsHeaderProps) {
  return (
    <div className="border-b border-border bg-gradient-to-b from-card to-background">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Image */}
        <div className="mb-8 overflow-hidden rounded-lg">
          <Image
            src={tool.image}
            alt={tool.name}
            width={800}
            height={400}
            className="h-96 w-full object-cover"
          />
        </div>

        {/* Tool Info */}
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground">{tool.name}</h1>
            <p className="mt-2 text-lg text-foreground/70">{tool.description}</p>
          </div>

          {/* Rating and Actions */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-accent text-accent"
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">
                {tool.rating} ({tool.reviews.toLocaleString()} reviews)
              </span>
            </div>

            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Visit Website
              <ExternalLink className="h-4 w-4" />
            </a>

            <button className="rounded-lg border border-border p-2 text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground">
              <Heart className="h-5 w-5" />
            </button>
          </div>

          {/* Full Description */}
          <div className="py-6">
            <p className="text-base leading-relaxed text-foreground/80">
              {tool.description_full}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
