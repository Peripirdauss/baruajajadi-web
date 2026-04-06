import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export function CTA() {
  return (
    <section className="relative py-20 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent"></div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-accent/20 bg-card/50 backdrop-blur-sm p-8 sm:p-12 space-y-8">
          {/* Heading */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Ready to level up?
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Join thousands of creators, developers, and designers who use BaruAjaJadi to streamline their workflow and create amazing projects.
            </p>
          </div>

          {/* Benefits List */}
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              'Access to all premium tools',
              'Regular content updates',
              'Priority support',
              'Exclusive resources & templates',
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <CheckCircle size={20} className="text-accent flex-shrink-0" />
                <span className="text-foreground/80">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl shadow-accent/20 h-14 px-10 font-black text-lg active:scale-95 transition-all">
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-2xl h-14 px-10 font-black text-lg border-border hover:bg-accent/5 active:scale-95 transition-all">
              <Link href="/about">Schedule a Demo</Link>
            </Button>
          </div>

          {/* Footer Text */}
          <p className="text-center text-sm text-foreground/60">
            No credit card required. Start free, upgrade anytime. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
