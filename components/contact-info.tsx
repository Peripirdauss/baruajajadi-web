import { Mail, MapPin, Clock, Linkedin, Twitter, Github } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Contact Details */}
      <div className="space-y-6">
        <div className="flex gap-4">
          <Mail className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-foreground">Email</h3>
            <a
              href="mailto:hello@baruajajadi.com"
              className="text-foreground/70 hover:text-accent transition-colors"
            >
              hello@baruajajadi.com
            </a>
          </div>
        </div>

        <div className="flex gap-4">
          <MapPin className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-foreground">Location</h3>
            <p className="text-foreground/70">Indonesia</p>
          </div>
        </div>

        <div className="flex gap-4">
          <Clock className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-foreground">Response Time</h3>
            <p className="text-foreground/70">Within 24-48 hours</p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="border-t border-border pt-8">
        <h3 className="mb-4 font-semibold text-foreground">Follow Us</h3>
        <div className="space-y-3">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border p-3 text-foreground/70 transition-all hover:border-accent hover:text-accent hover:bg-secondary"
          >
            <Twitter className="h-5 w-5" />
            <span className="text-sm font-medium">Twitter</span>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border p-3 text-foreground/70 transition-all hover:border-accent hover:text-accent hover:bg-secondary"
          >
            <Linkedin className="h-5 w-5" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-border p-3 text-foreground/70 transition-all hover:border-accent hover:text-accent hover:bg-secondary"
          >
            <Github className="h-5 w-5" />
            <span className="text-sm font-medium">GitHub</span>
          </a>
        </div>
      </div>

      {/* Quick Services */}
      <div className="border-t border-border pt-8">
        <h3 className="mb-4 font-semibold text-foreground">Available For</h3>
        <ul className="space-y-2 text-sm text-foreground/70">
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Freelance Projects
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Consulting
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Partnerships
          </li>
          <li className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Speaking Engagements
          </li>
        </ul>
      </div>
    </div>
  );
}
