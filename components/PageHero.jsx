export default function PageHero({ eyebrow, title, description, image }) {
  return (
    <section className="relative flex min-h-[340px] items-end overflow-hidden bg-navy-950 py-16 sm:min-h-[400px]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/75 to-navy-950/20" />
      <div className="container-shell relative z-10 pb-2">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[.28em] text-gold-500">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-center font-serif text-4xl leading-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}
