import { Check } from "lucide-react";

interface PricingPlan {
  plan: string;
  price: string;
  features: string[];
}

interface ToolPricingProps {
  pricing: PricingPlan[];
}

export function ToolPricing({ pricing }: ToolPricingProps) {
  return (
    <section className="border-b border-border py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground">Pricing Plans</h2>
          <p className="mt-4 text-lg text-foreground/70">
            Choose the plan that fits your needs
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pricing.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg border border-border bg-card p-8 transition-all hover:shadow-lg hover:border-accent"
            >
              <h3 className="text-xl font-semibold text-foreground">
                {plan.plan}
              </h3>
              <p className="mt-4 text-3xl font-bold text-primary">
                {plan.price}
              </p>
              <button className="mt-6 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Get Started
              </button>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex gap-3 text-foreground/80">
                    <Check className="h-5 w-5 flex-shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
