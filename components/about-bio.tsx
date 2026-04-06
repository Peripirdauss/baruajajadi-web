export function AboutBio() {
  return (
    <section className="border-b border-border px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Bio Text */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">My Story</h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                I&apos;m a passionate digital creator dedicated to bridging the gap between design and technology. 
                With over a decade of experience in the digital space, I&apos;ve developed a deep understanding 
                of what makes products intuitive, beautiful, and impactful.
              </p>
              <p>
                My journey began with a simple belief: great tools empower great creators. This philosophy 
                has guided every project I&apos;ve undertaken, from designing interfaces to building comprehensive 
                digital ecosystems that serve thousands of creators worldwide.
              </p>
              <p>
                Today, I focus on creating resources, tools, and content that help designers and developers 
                work smarter, build faster, and create with confidence. Whether it&apos;s through curated assets, 
                innovative tools, or insightful content, I&apos;m committed to elevating the creative community.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Core Values</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Excellence',
                  description: 'Delivering high-quality work in everything I create'
                },
                {
                  title: 'Community',
                  description: 'Building resources that strengthen creative communities'
                },
                {
                  title: 'Innovation',
                  description: 'Constantly exploring new possibilities and ideas'
                },
                {
                  title: 'Authenticity',
                  description: 'Sharing genuine insights and meaningful connections'
                }
              ].map((value) => (
                <div key={value.title} className="rounded-lg bg-card p-4 border border-border">
                  <h3 className="font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-foreground/60 mt-1">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
