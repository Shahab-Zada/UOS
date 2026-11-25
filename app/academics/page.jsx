import PageHero from "../../components/PageHero";
import SectionHeading from "../../components/SectionHeading";
import { programs as fallbackPrograms } from "../../lib/data";
import { getPublished } from "../../lib/content";
import Program from "../../models/Program";
import { ArrowUpRight } from "lucide-react";
export const metadata = { title: "Academics" };
export const dynamic = "force-dynamic";
export default async function Academics() {
  const programs = await getPublished(Program, fallbackPrograms);
  return (
    <>
      <PageHero
        eyebrow="Academic experience"
        title="Learning for a changing world."
        description="Discover challenging programs that connect deep knowledge with practical experience."
        image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="section-pad bg-ivory">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Find your direction"
            title="Programs built around possibility"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <article
                key={p._id || p.name}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                {(p.imageUrl || p.image) && (
                  <img
                    src={p.imageUrl || p.image}
                    alt={p.name}
                    className="h-48 w-full object-cover"
                  />
                )}
                <div className="p-7">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
                    {p.level} · {p.duration}
                  </p>
                  <h2 className="mt-4 font-serif text-2xl text-navy-900">
                    {p.name}
                  </h2>
                  <p className="mt-2 text-xs font-semibold text-slate-400">
                    {p.department}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    {p.description}
                  </p>
                  <a
                    href="/admissions"
                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase"
                  >
                    Admissions info <ArrowUpRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
