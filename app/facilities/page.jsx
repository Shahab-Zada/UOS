import PageHero from "../../components/PageHero";
import SectionHeading from "../../components/SectionHeading";
export const metadata = { title: "Campus Facilities" };
const sections = [
  {
    title: "Learning spaces",
    body: "Flexible classrooms, collaborative study areas and modern lecture theatres support teaching and learning.",
  },
  {
    title: "Libraries & laboratories",
    body: "Learning resources include quiet study spaces, digital collections, specialist laboratories and practical learning environments.",
  },
  {
    title: "Campus amenities",
    body: "Food services, sports and recreation areas, transport connections and accessible campus spaces.",
  },
];
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="University of Swat"
        title="Spaces designed for discovery."
        description="Explore the places, resources and services that support learning, research and community."
        image="https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Campus Facilities"
            title="Campus Facilities"
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
        </div>
      </section>
    </>
  );
}
