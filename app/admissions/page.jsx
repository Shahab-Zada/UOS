import PageHero from "../../components/PageHero";
import SectionHeading from "../../components/SectionHeading";
export const metadata = { title: "Admissions" };
const sections = [
  {
    title: "Undergraduate admissions",
    body: "Applicants should have completed the relevant intermediate or equivalent qualification. Program-specific subject requirements and merit criteria may apply.",
  },
  {
    title: "Graduate admissions",
    body: "Graduate applicants should hold a relevant bachelor's degree from a recognised institution. Some programs may require an interview or entrance assessment.",
  },
  {
    title: "How to apply",
    body: "Explore programs, review eligibility requirements, prepare academic documents and follow the official application instructions.",
  },
  {
    title: "Scholarships",
    body: "Merit-based and need-aware support opportunities may be available. Contact admissions for current eligibility and deadlines.",
  },
];
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="University of Swat"
        title="Your journey begins with a question."
        description="Find the information you need to take your next step at University of Swat."
        image="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading eyebrow="Admissions" title="Admissions" />
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
