export function AboutBio() {
  return (
    <section className="border-b border-border px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Bio Text */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black lowercase tracking-tight">kenapa kita ada?</h2>
            <div className="space-y-4 text-foreground/70 leading-relaxed lowercase font-medium">
              <p>
                kita tau banget rasanya jadi pejuang online jaman sekarang. mau fokus bikin konten atau besarin brand, tapi malah habis waktu diurusin administrasi yang ribetnya minta ampun.
              </p>
              <p>
                makanya baruajajadi dibikin. misi kita simpel: sediain semua "senjata" yang kamu butuhin—mulai dari kalkulator cuan, link affiliate otomatis, sampe template jualan—biar kerjaan kamu makin sat-set dan gak pake lama.
              </p>
              <p>
                kita pengen kamu bisa fokus ke hal yang paling penting: kembangin ide dan dapetin cuan maksimal. biar urusan admin yang membosankan kita yang beresin pake tools sakti kita.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black lowercase tracking-tight">vibes kita</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'sat-set',
                  description: 'kerjaan beres cepet, nggak pake drama.'
                },
                {
                  title: 'temen cuan',
                  description: 'kita ada buat bantu kamu makin untung.'
                },
                {
                  title: 'anti-ribet',
                  description: 'gak perlu teknis banget, semua orang bisa pake.'
                },
                {
                  title: 'pasti beres',
                  description: 'kualitas yang beneran bantu jualan kamu.'
                }
              ].map((value) => (
                <div key={value.title} className="rounded-2xl bg-card p-5 border border-border shadow-sm">
                  <h3 className="font-black text-foreground lowercase">{value.title}</h3>
                  <p className="text-sm text-foreground/60 mt-1 lowercase">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
