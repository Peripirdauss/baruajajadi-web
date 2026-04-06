import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArrowRight, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl text-center">
          {/* Large Error Code */}
          <div className="mb-8">
            <div className="text-9xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              404
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
            We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or never existed in the first place.
          </p>

          {/* Quick Links */}
          <div className="mb-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Home className="h-5 w-5" />
              Back to Home
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
            >
              <Search className="h-5 w-5" />
              Browse Blog
            </Link>
          </div>

          {/* Suggestions */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              You might find these useful:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/tools"
                className="flex items-center justify-between rounded-lg border border-border p-4 text-foreground/70 hover:text-foreground hover:border-accent transition-colors group"
              >
                <span>Tools</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/assets"
                className="flex items-center justify-between rounded-lg border border-border p-4 text-foreground/70 hover:text-foreground hover:border-accent transition-colors group"
              >
                <span>Assets</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/about"
                className="flex items-center justify-between rounded-lg border border-border p-4 text-foreground/70 hover:text-foreground hover:border-accent transition-colors group"
              >
                <span>About</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between rounded-lg border border-border p-4 text-foreground/70 hover:text-foreground hover:border-accent transition-colors group"
              >
                <span>Contact</span>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
