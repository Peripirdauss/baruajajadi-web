export function Timeline() {
  const milestones = [
    {
      year: '2024',
      title: 'Launched BaruAjaJadi',
      description: 'Created a comprehensive hub for tools, assets, and insights serving the creative community'
    },
    {
      year: '2023',
      title: 'Reached 50K Community Members',
      description: 'Grew audience across platforms while maintaining focus on quality content and resources'
    },
    {
      year: '2022',
      title: 'Open-Sourced Component Library',
      description: 'Released React component library with 5K+ GitHub stars and active community contributions'
    },
    {
      year: '2021',
      title: 'Founded Design Academy',
      description: 'Launched online learning platform with 100+ courses educating 50K+ students globally'
    },
    {
      year: '2020',
      title: 'Started Digital Publishing',
      description: 'Began publishing design and development insights reaching 100K+ monthly readers'
    },
    {
      year: '2018',
      title: 'Full-Time Creator',
      description: 'Transitioned to building products and content as primary focus'
    }
  ];

  return (
    <section className="border-b border-border px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Journey & Milestones</h2>
            <p className="text-foreground/60 text-lg">
              Key moments in my creative journey and growth as a digital creator
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={milestone.year} className="flex gap-6 md:gap-8">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                    {milestone.year}
                  </div>
                  {index !== milestones.length - 1 && (
                    <div className="mt-4 h-12 w-1 bg-border/50"></div>
                  )}
                </div>

                {/* Content */}
                <div className="pb-8 pt-2">
                  <h3 className="text-lg font-semibold text-foreground">{milestone.title}</h3>
                  <p className="mt-2 text-foreground/60">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
