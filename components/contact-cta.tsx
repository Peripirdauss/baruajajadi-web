export function ContactCTA() {
  return (
    <section className="border-b border-border px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Let&apos;s Connect</h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Whether you have a collaboration idea, want to learn more about my work, or just want to say hello, 
              I&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3 justify-center">
            <a
              href="mailto:hello@baruajajadi.com"
              className="group rounded-lg border border-border bg-card p-6 hover:border-accent hover:bg-accent/5 transition-all text-center"
            >
              <div className="text-2xl mb-3">✉️</div>
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-2">Email</h3>
              <p className="text-sm text-foreground/60">hello@baruajajadi.com</p>
            </a>

            <a
              href="https://twitter.com/baruajajadi"
              className="group rounded-lg border border-border bg-card p-6 hover:border-accent hover:bg-accent/5 transition-all text-center"
            >
              <div className="text-2xl mb-3">𝕏</div>
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-2">Twitter</h3>
              <p className="text-sm text-foreground/60">@baruajajadi</p>
            </a>

            <a
              href="https://linkedin.com/in/baruajajadi"
              className="group rounded-lg border border-border bg-card p-6 hover:border-accent hover:bg-accent/5 transition-all text-center"
            >
              <div className="text-2xl mb-3">💼</div>
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-2">LinkedIn</h3>
              <p className="text-sm text-foreground/60">in/baruajajadi</p>
            </a>
          </div>

          <div className="text-center space-y-4 pt-6 border-t border-border">
            <h3 className="font-semibold text-foreground">Available For</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Collaborations', 'Speaking', 'Consulting', 'Partnerships', 'Mentoring'].map((item) => (
                <span
                  key={item}
                  className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium border border-accent/20"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
