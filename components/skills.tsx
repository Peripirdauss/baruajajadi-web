export function Skills() {
  const skillCategories = [
    {
      category: 'Design',
      skills: ['UI/UX Design', 'Figma', 'Design Systems', 'Branding', 'Prototyping', 'Illustration']
    },
    {
      category: 'Development',
      skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Web APIs']
    },
    {
      category: 'Tools & Platforms',
      skills: ['Figma', 'Adobe Creative Suite', 'Git', 'Vercel', 'Supabase', 'GraphQL']
    },
    {
      category: 'Content & Strategy',
      skills: ['Technical Writing', 'Content Strategy', 'SEO', 'Community Building', 'Analytics']
    }
  ];

  return (
    <section className="border-b border-border px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-bold mb-4">Skills & Expertise</h2>
            <p className="text-foreground/60 text-lg">
              A comprehensive toolkit developed through years of practice and continuous learning
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {skillCategories.map((category) => (
              <div key={category.category} className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent border border-accent/20 hover:bg-accent/20 transition-colors"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
