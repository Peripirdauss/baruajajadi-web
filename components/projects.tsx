import { ExternalLink } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: 'Success Brand A',
      description: 'Bantu brand skincare scale up lewat optimasi KOL dan link affiliate sakti.',
      tags: ['KOL Strat', 'Cuan Up', 'Sales'],
      impact: 'naik 300% sales',
      link: '#'
    },
    {
      title: 'Affiliate Master Project',
      description: 'Otomasi link buat 100+ affiliate leader biar komisi makin lancar jaya.',
      tags: ['Automation', 'Sat-set', 'Income'],
      impact: '10K+ clicks/mo',
      link: '#'
    },
    {
      title: 'TikTok Shop Domination',
      description: 'Berhasil bikin 500+ deskripsi produk auto-laris pake AI dalam seminggu.',
      tags: ['AI Content', 'Fast', 'Result'],
      impact: '500+ produk live',
      link: '#'
    }
  ];

  return (
    <section className="border-b border-border px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-black mb-4 lowercase tracking-tight">brand yang udah gaskeun 🚀</h2>
            <p className="text-foreground/60 text-lg lowercase">
              cerita sukses dari mereka yang udah pakai tools kita buat scale up bisnisnya.
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
