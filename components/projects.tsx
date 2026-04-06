import { ExternalLink } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: 'Design System Pro',
      description: 'A comprehensive design system with 200+ components, tokens, and documentation for scaling design across teams',
      tags: ['Design Systems', 'Figma', 'Documentation'],
      impact: '10K+ downloads',
      link: '#'
    },
    {
      title: 'Creative Tools Hub',
      description: 'Curated collection of 500+ design and development tools with detailed reviews and use cases',
      tags: ['Tools', 'Curation', 'Community'],
      impact: '50K+ users',
      link: '#'
    },
    {
      title: 'UI Component Library',
      description: 'Open-source React component library built with TypeScript and Tailwind CSS, extensively documented',
      tags: ['React', 'Open Source', 'Components'],
      impact: '5K+ GitHub stars',
      link: '#'
    },
    {
      title: 'Design & Dev Academy',
      description: 'Online learning platform with 100+ courses teaching design thinking, UI/UX, and modern web development',
      tags: ['Education', 'Content', 'Community'],
      impact: '50K+ students',
      link: '#'
    },
    {
      title: 'Asset Marketplace',
      description: 'Digital marketplace for selling and distributing design assets, templates, and resources',
      tags: ['E-Commerce', 'Design', 'Marketplace'],
      impact: '$100K+ revenue',
      link: '#'
    },
    {
      title: 'Design Insights Blog',
      description: 'Weekly published articles covering design trends, development tips, and industry insights with 100K+ monthly readers',
      tags: ['Content', 'Blog', 'Thought Leadership'],
      impact: '100K+ monthly readers',
      link: '#'
    }
  ];

  return (
    <section className="border-b border-border px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Notable Projects</h2>
            <p className="text-foreground/60 text-lg">
              A selection of projects that showcase my passion for creating impactful digital experiences
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <a
                key={project.title}
                href={project.link}
                className="group rounded-lg border border-border bg-card p-6 hover:border-accent/50 hover:bg-card/50 transition-all"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block text-xs font-medium px-2.5 py-1 rounded-md bg-accent/10 text-accent border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <p className="text-xs font-medium text-foreground/50">{project.impact}</p>
                      <ExternalLink className="h-4 w-4 text-foreground/40 group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
