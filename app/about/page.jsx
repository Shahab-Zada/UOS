export const metadata = {
  title: "About University of Swat",
  description:
    "Learn about the University of Swat, its history, vision, mission and values.",
};

const sections = [
  {
    title: "Our Story",
    body: "Founded on the belief that education can transform lives, the University of Swat is a vibrant community of learners, educators and researchers. Located in the beautiful Swat Valley of Khyber Pakhtunkhwa, Pakistan, the university is committed to academic excellence, innovation and community development.",
  },
  {
    title: "Vision & Mission",
    body: "Our vision is to become a leading centre of learning, discovery and responsible leadership. Our mission is to empower people with knowledge, curiosity and confidence while promoting research, critical thinking and positive contributions to society.",
  },
  {
    title: "Our Values",
    body: "Integrity, curiosity, inclusion, collaboration and impact guide the way we teach, learn, research and serve. We encourage creativity, respect diversity and promote a culture of academic responsibility.",
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Independent Hero Section */}
      <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden bg-slate-950 px-6 py-20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/50" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-amber-400">
            University of Swat
          </p>

          <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
            A University Shaped by Curiosity, Driven by Purpose.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            Discover the people, values and ambition behind our academic
            community in the beautiful Swat Valley of Khyber Pakhtunkhwa.
          </p>
        </div>
      </section>

      {/* About Introduction */}
      <section className="px-6 py-20 sm:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
              About University of Swat
            </p>

            <h2 className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
              Knowledge, Excellence & Innovation
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-500">
              The University of Swat is dedicated to providing quality higher
              education, encouraging research and preparing students to become
              responsible members of society.
            </p>
          </div>

          {/* Information Cards */}
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {sections.map((section, index) => (
              <article
                key={section.title}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="text-sm font-bold tracking-widest text-amber-600">
                  0{index + 1}
                </span>

                <h3 className="mt-5 font-serif text-2xl font-bold text-slate-900">
                  {section.title}
                </h3>

                <p className="mt-5 text-sm leading-8 text-slate-600">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-slate-950 px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Building a Better Future Through Education
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-300">
            We believe education is a powerful tool for transforming
            individuals, communities and the future of our society.
          </p>
        </div>
      </section>
    </main>
  );
}
