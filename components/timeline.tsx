export function Timeline() {
  const milestones = [
    {
      year: '2024',
      title: 'Launched BaruAjaJadi',
      description: 'A hub for tools, assets, and creative resources.'
    },
    {
      year: '2023',
      title: 'Reached 50K Members',
      description: 'Grew a thriving community across platforms.'
    },
    {
      year: '2022',
      title: 'Open-Sourced Component Library',
      description: '5K+ GitHub stars and active contributions.'
    },
    {
      year: '2021',
      title: 'Founded Design Academy',
      description: '100+ courses, 50K+ students worldwide.'
    },
    {
      year: '2020',
      title: 'Started Digital Publishing',
      description: '100K+ monthly readers and growing.'
    },
    {
      year: '2018',
      title: 'Full-Time Creator',
      description: 'Went all-in on building products and content.'
    }
  ];

  return (
    <section className="border-b border-border px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Journey & Milestones</h2>
            <p className="text-foreground/60 text-lg">
              Key moments in my creative journey.
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
