import { Download, ExternalLink, Star } from 'lucide-react';
import Link from 'next/link';

interface AssetCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  downloads?: number;
  rating?: number;
  link?: string;
}

export default function AssetCard({
  id,
  title,
  description,
  category,
  image,
  downloads = 0,
  rating = 5.0,
  link = `/assets/${id}`,
}: AssetCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-accent hover:shadow-lg">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-secondary">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            {category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">{rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="mt-2 text-sm text-foreground/60 line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="text-sm text-foreground/60">
            <Download className="mb-1 inline-block h-4 w-4" /> {downloads.toLocaleString()} downloads
          </div>
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:bg-accent"
          >
            Get <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
