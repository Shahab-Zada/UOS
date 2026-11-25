import Image from "next/image";
import PageHero from "../../components/PageHero";
import SectionHeading from "../../components/SectionHeading";
import { faculty as fallbackFaculty } from "../../lib/data";
import { getPublished } from "../../lib/content";
import Faculty from "../../models/Faculty";
export const metadata = { title: "Faculty" };
export const dynamic = "force-dynamic";
export default async function FacultyPage() {
  const faculty = await getPublished(Faculty, fallbackFaculty);
  return (
    <>
      <PageHero
        eyebrow="Our people"
        title="Meet the minds behind the mission."
        description="Educators and researchers who inspire new questions and ambitious discovery."
        image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Faculty directory"
            title="Expertise with a human touch"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {faculty.map((f) => (
              <article
                key={f.name}
                className="overflow-hidden rounded-2xl border bg-white"
              >
                <div className="relative h-64">
                  <Image
                    src={
                      f.imageUrl ||
                      f.image ||
                      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85"
                    }
                    alt={f.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
                    {f.department}
                  </p>
                  <h2 className="mt-2 font-serif text-xl text-navy-900">
                    {f.name}
                  </h2>
                  <p className="mt-1 text-xs text-slate-400">{f.role}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    {f.bio}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
