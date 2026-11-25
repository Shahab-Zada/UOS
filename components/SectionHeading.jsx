export default function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p
        className={`mb-3 text-[10px] font-bold uppercase tracking-[.25em] ${light ? "text-gold-500" : "text-gold-600"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-serif text-3xl leading-tight sm:text-4xl md:text-5xl ${light ? "text-white" : "text-navy-900"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-sm leading-7 ${light ? "text-white/60" : "text-slate-500"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
