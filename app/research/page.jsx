import PageHero from "../../components/PageHero";
import SectionHeading from "../../components/SectionHeading";
import Research from "../../models/Research";
import { getPublished } from "../../lib/content";
export const metadata = { title: "Research & Innovation" };
const sections = [
  {
    title: "Research with purpose",
    body: "Research at University of Swat is driven by curiosity and a desire to improve lives across technology, health, society and environment.",
  },
  {
    title: "Research themes",
    body: "Artificial intelligence, sustainable futures, advanced materials, public health, inclusive economies and culture.",
  },
  {
    title: "Collaborate with us",
    body: "We welcome partnerships with academic institutions, public organisations, industry and community groups.",
  },
];
export const dynamic = "force-dynamic";
export default async function Page() {
  const researchItems = await getPublished(Research, []);
  return (
    <>
      <PageHero
        eyebrow="University of Swat"
        title="Ideas that move knowledge forward."
        description="Our researchers work across disciplines to address complex questions and create meaningful impact."
        image="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Research & Innovation"
            title="Research & Innovation"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((s, i) => (
              <article
                key={s.title}
                className="rounded-2xl border border-slate-100 p-7 shadow-sm"
              >
                <span className="text-xs font-bold tracking-widest text-gold-600">
                  0{i + 1}
                </span>
                <h2 className="mt-4 font-serif text-2xl text-navy-900">
                  {s.title}
                </h2>
                <p className="mt-4 text-sm leading-8 text-slate-500">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
          {researchItems.length > 0 && (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {researchItems.map((item) => (
                <article
                  key={item._id}
                  className="overflow-hidden rounded-2xl border bg-white"
                >
                  {(item.imageUrl || item.image) && (
                    <img
                      src={item.imageUrl || item.image}
                      alt={item.title}
                      className="h-52 w-full object-cover"
                    />
                  )}
                  <div className="p-7">
                    <p className="eyebrow">{item.area}</p>
                    <h3 className="mt-2 font-serif text-2xl text-navy-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      {item.summary}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
