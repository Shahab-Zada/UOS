import PageHero from "../../components/PageHero";
import SectionHeading from "../../components/SectionHeading";
export const metadata = { title: "Campus Life" };
const sections = [
  {
    title: "A vibrant community",
    body: "Student societies, creative projects, cultural celebrations and shared experiences make University of Swat a place to grow.",
  },
  {
    title: "Clubs & societies",
    body: "From technology and entrepreneurship to music, literature, debate and volunteering, there are many ways to connect.",
  },
  {
    title: "Sport & wellbeing",
    body: "Our sporting facilities and recreational activities encourage teamwork, confidence and a balanced university experience.",
  },
];
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="University of Swat"
        title="A place to belong and become."
        description="Find your community, discover new interests and make memories that last beyond graduation."
        image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading eyebrow="Campus Life" title="Campus Life" />
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
