export function AboutHero() {
  return (
    <section className="border-b border-border px-4 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl text-pretty">
              Digital Creator & Innovation Enthusiast
            </h1>
            <p className="text-xl text-foreground/60 text-pretty">
              Crafting tools, sharing knowledge, and building beautiful digital experiences
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">10+</div>
              <p className="text-sm text-foreground/60">Years of Experience</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">50K+</div>
              <p className="text-sm text-foreground/60">Community Members</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">100+</div>
              <p className="text-sm text-foreground/60">Resources Created</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
