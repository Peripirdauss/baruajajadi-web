import { ExternalLink, Star } from 'lucide-react'

interface ToolCardProps {
  name: string
  description: string
  category: string
  rating?: number
  reviews?: number
  icon: string
  url: string
  features?: string[]
  pricing?: 'free' | 'pro'
}

export function ToolCard({
  name,
  description,
  category,
  rating,
  reviews = 0,
  icon,
  url,
  features,
  pricing = 'free',
}: ToolCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-lg dark:hover:shadow-primary/20"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{icon}</div>
          {pricing === 'pro' && (
            <span className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground shadow-sm">PRO</span>
          )}
          {pricing === 'free' && (
            <span className="rounded-md bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">FREE</span>
          )}
        </div>
        <ExternalLink className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <h3 className="mt-4 text-xl font-bold text-foreground">{name}</h3>
      
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      <div className="mt-4 flex items-center gap-2">
        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {category}
        </span>
      </div>

      {rating !== undefined && (
        <div className="mt-4 flex items-center gap-1">
          <div className="flex text-accent">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating) ? 'fill-current' : 'fill-muted stroke-muted'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-xs text-muted-foreground">
            {rating} ({reviews} reviews)
          </span>
        </div>
      )}

      {features && features.length > 0 && (
        <div className="mt-6 space-y-2 border-t border-border pt-4">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Key Features
          </p>
          <ul className="space-y-1">
            {features.map((feature, idx) => (
              <li key={idx} className="text-xs text-muted-foreground">
                • {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="mt-6 w-full rounded-lg bg-primary py-2 font-medium text-primary-foreground transition-colors hover:opacity-90">
        Learn More
      </button>
    </a>
  )
}
