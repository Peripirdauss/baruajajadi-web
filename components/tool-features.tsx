import { Check } from "lucide-react";

interface ToolFeaturesProps {
  features: string[];
}

export function ToolFeatures({ features }: ToolFeaturesProps) {
  return (
    <section className="border-b border-border py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground">Key Features</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Everything you need to succeed
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-secondary"
            >
              <Check className="h-5 w-5 flex-shrink-0 text-accent" />
              <span className="text-foreground/80">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
