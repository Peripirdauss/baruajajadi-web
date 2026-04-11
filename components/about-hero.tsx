export function AboutHero() {
  return (
    <section className="border-b border-border px-4 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold sm:text-5xl lg:text-6xl text-pretty lowercase tracking-tighter">
              cerita kita & misi bantu kamu cuan 💸
            </h1>
            <p className="text-xl text-foreground/70 text-pretty lowercase font-normal">
              kita bikin baruajajadi buat kamu pejuang konten, brand owner, & affiliate yang pengen fokus jualan tanpa pusing urusan administrasi.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm font-bold text-foreground/60 lowercase">brand dibantu</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-black text-primary">500+</div>
              <p className="text-sm font-bold text-foreground/60 lowercase">aset siap pakai</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-black text-primary">20+</div>
              <p className="text-sm font-bold text-foreground/60 lowercase">tools sakti</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
