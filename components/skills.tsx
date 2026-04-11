export function Skills() {
  const skillCategories = [
    {
      category: 'strategi cuan',
      skills: ['KOL Marketing', 'Affiliate Specialist', 'Brand Growth', 'Optimasi Penjualan', 'Market Analytics']
    },
    {
      category: 'tools sakti',
      skills: ['Automation', 'AI Copywriting', 'Auto-UTM Tracking', 'Margin Calculator', 'Lead Generation']
    },
    {
      category: 'aset kece',
      skills: ['Branding Kits', 'Template Shopee/TikTok', 'Asset Management', 'Engagement Assets']
    },
    {
      category: 'support bestie',
      skills: ['Priority Access', 'Community Insights', 'Weekly Tips', 'Sat-set Service']
    }
  ];

  return (
    <section className="border-b border-border px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-black mb-4 lowercase tracking-tight">senjata kita buat bantu kamu 🔥</h2>
            <p className="text-foreground/60 text-lg lowercase">
              kumpulan strategi & tools yang udah kita asah buat pastiin bisnis kamu makin gacor dan sat-set.
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
