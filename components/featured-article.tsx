import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';

export function FeaturedArticle() {
  return (
    <Link href="/blog/the-future-of-design-tools">
      <div className="group grid overflow-hidden rounded-lg border border-border transition-all hover:border-accent hover:shadow-lg md:grid-cols-2">
        <div className="overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
          <img
            src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop"
            alt="The Future of Design Tools"
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
              The Future of Design Tools: What&apos;s Coming in 2025
            </h2>
            <p className="mt-3 text-foreground/60">
              Exploring emerging trends in design technology, AI-powered design assistants, and how tools are evolving.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/50">
            <div className="flex items-center gap-1">
              <User className="size-4" />
              <span>Sarah Anderson</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="size-4" />
              <span>Mar 15, 2025</span>
            </div>
            <span>8 min read</span>
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
