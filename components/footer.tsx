import Link from 'next/link'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import { Twitter, Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Footer Grid */}
        <div className="grid gap-8 md:grid-cols-4 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 relative overflow-hidden rounded-lg bg-muted/20 border border-border">
                <Image 
                  src="/logo.jpg" 
                  alt="BaruAjaJadi Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-bold text-foreground">BaruAjaJadi</span>
            </div>
            <p className="text-sm text-foreground/60">
              Your digital hub for tools, assets, and creative inspiration.
            </p>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Developer
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Design
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  AI Tools
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/assets" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Assets
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-foreground/60">
            © {currentYear} BaruAjaJadi. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <Link href="#" aria-label="Twitter" className="text-foreground/60 hover:text-foreground transition-colors">
              <Twitter size={20} />
            </Link>
            <Link href="#" aria-label="GitHub" className="text-foreground/60 hover:text-foreground transition-colors">
              <Github size={20} />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-foreground/60 hover:text-foreground transition-colors">
              <Linkedin size={20} />
            </Link>
            <Link href="#" aria-label="Email" className="text-foreground/60 hover:text-foreground transition-colors">
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
