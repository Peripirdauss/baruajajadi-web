import { Star } from "lucide-react";

interface Testimonial {
  author: string;
  role: string;
  company: string;
  quote: string;
}

interface ToolTestimonialsProps {
  testimonials: Testimonial[];
}

export function ToolTestimonials({ testimonials }: ToolTestimonialsProps) {
  return (
    <section className="border-b border-border py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            What Users Say
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Join thousands of satisfied users
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-foreground/80 leading-relaxed mb-6">
                &quot;{testimonial.quote}&quot;
              </p>

              {/* Author */}
              <div className="border-t border-border pt-4">
                <p className="font-medium text-foreground">{testimonial.author}</p>
                <p className="text-sm text-foreground/60">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
