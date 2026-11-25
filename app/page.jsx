import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Microscope,
  BookOpen,
  Globe2,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { DepartmentCard, NewsCard, EventCard } from "../components/Cards";
import {
  departments as fallbackDepartments,
  stats,
  news as fallbackNews,
  events as fallbackEvents,
} from "../lib/data";
import { getPublished } from "../lib/content";
import Department from "../models/Department";
import News from "../models/News";
import Event from "../models/Event";
import uos1 from "../public/uos2.jpg";
import uos2 from "../public/uos1.jpg";
export const dynamic = "force-dynamic";
export default async function Home() {
  const [departments, news, events] = await Promise.all([
    getPublished(Department, fallbackDepartments),
    getPublished(News, fallbackNews),
    getPublished(Event, fallbackEvents),
  ]);
  return (
    <>
      <section className="relative min-h-[650px] overflow-hidden bg-navy-950 sm:min-h-[740px]">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-45"
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=2200&q=90"
        >
          <source src="/videos/campus.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/75 to-navy-950/20" />
        <div className="container-shell relative z-10 flex min-h-[650px] items-center py-24 sm:min-h-[740px]">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[.22em] text-white/80">
              Knowledge · Character · Opportunity
            </div>
            <h1 className="font-serif text-5xl leading-[1.08] text-white sm:text-6xl md:text-7xl">
              Discover your potential.
              <br />
              <em className="text-gold-500">Shape tomorrow.</em>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/75">
              Welcome to the University of Swat — a centre of higher learning in
              the heart of the Swat Valley, Khyber Pakhtunkhwa. Explore academic
              excellence, meaningful research and a vibrant campus community.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 rounded-full bg-gold-500 px-7 py-4 text-xs font-bold uppercase tracking-widest text-white"
              >
                Discover our university <ArrowRight size={16} />
              </Link>
              <Link
                href="/admissions"
                className="rounded-full border border-white/40 px-7 py-4 text-xs font-bold uppercase tracking-widest text-white"
              >
                Admissions
              </Link>
            </div>
            <p className="mt-16 text-[10px] font-semibold uppercase tracking-[.24em] text-white/55">
              Charbagh, Swat · Khyber Pakhtunkhwa · Pakistan
            </p>
          </div>
        </div>
      </section>
      <section className="border-b">
        <div className="container-shell grid grid-cols-2 gap-7 py-9 sm:grid-cols-4">
          {stats.map(([v, l]) => (
            <div key={l} className="border-l border-gold-500/50 pl-4">
              <p className="font-serif text-3xl text-navy-900 sm:text-4xl">
                {v}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {l}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="section-pad bg-ivory">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-2">
          <div className="relative h-[420px] overflow-hidden rounded-2xl sm:h-[500px]">
            <Image src={uos1} alt="Campus life" fill className="object-cover" />
            <div className="absolute bottom-0 right-0 bg-navy-900 p-6 text-white">
              <b className="font-serif text-3xl text-gold-500">
                A brighter future
              </b>
              <p className="mt-1 max-w-[180px] text-xs text-white/70">
                of nurturing curiosity and leadership.
              </p>
            </div>
          </div>
          <div>
            <p className="eyebrow">Welcome to the University of Swat</p>
            <h2 className="mt-4 font-serif text-4xl text-navy-900 sm:text-5xl">
              A university for the{" "}
              <em className="text-gold-600">next generation</em> of thinkers.
            </h2>
            <p className="mt-6 text-sm leading-8 text-slate-500">
              Education is more than a qualification. It is a journey of
              discovery, collaboration and growth. Our community brings together
              inspiring educators, bold researchers and students ready to make
              their mark.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 border-b border-gold-500 pb-2 text-xs font-bold uppercase tracking-widest"
            >
              Our story <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Learn without limits"
            title="Find your field of possibility"
            description="Explore disciplines that challenge convention, connect ideas and prepare you to shape what comes next."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.slice(0, 3).map((d) => (
              <DepartmentCard key={d.short} item={d} />
            ))}
          </div>
          <Link
            href="/departments"
            className="mt-8 inline-flex gap-2 text-xs font-bold uppercase tracking-widest"
          >
            All departments <ArrowUpRight size={15} />
          </Link>
        </div>
      </section>
      <section className="bg-navy-950 py-24">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Beyond the classroom"
            title="Knowledge with a wider impact"
            description="Learning, research and real-world challenges come together to create a better future."
            light
          />
          <div className="grid gap-5 md:grid-cols-3">
            {[
              [
                Microscope,
                "Research & discovery",
                "Explore bold questions and advance knowledge through collaborative research.",
                "/research",
              ],
              [
                BookOpen,
                "Academic excellence",
                "Build the knowledge and skills to navigate a world in constant motion.",
                "/academics",
              ],
              [
                Globe2,
                "A connected community",
                "Find your people, share perspectives and create lifelong connections.",
                "/campus-life",
              ],
            ].map(([Icon, title, desc, href]) => (
              <div
                key={title}
                className="rounded-2xl border border-white/10 bg-white/5 p-8"
              >
                <Icon className="text-gold-500" size={30} />
                <h3 className="mt-7 font-serif text-2xl text-white">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/55">{desc}</p>
                <Link
                  href={href}
                  className="mt-7 inline-flex gap-2 text-xs font-bold uppercase tracking-widest text-gold-500"
                >
                  Explore <ArrowUpRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad bg-ivory">
        <div className="container-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="What's happening"
              title="Stories from our community"
              description="The latest ideas, discoveries and achievements from across University of Swat."
            />
            <Link
              href="/news"
              className="text-xs font-bold uppercase tracking-widest"
            >
              View all news <ArrowUpRight size={15} />
            </Link>
            <div className="mt-9">
              <h3 className="font-serif text-2xl text-navy-900">
                Upcoming events
              </h3>
              {events.slice(0, 2).map((e) => (
                <EventCard key={e._id || e.title} item={e} />
              ))}
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {news.slice(0, 2).map((n) => (
              <NewsCard key={n._id || n.slug || n.title} item={n} />
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Your next chapter</p>
            <h2 className="mt-4 font-serif text-4xl text-navy-900 sm:text-5xl">
              The future is waiting for{" "}
              <em className="text-gold-600">your perspective.</em>
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-500">
              Find a program that inspires you and begin a journey that is
              uniquely yours.
            </p>
            <Link
              href="/admissions"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-navy-900 px-7 py-4 text-xs font-bold uppercase tracking-widest text-white"
            >
              Explore admissions <ArrowRight size={15} />
            </Link>
          </div>
          <div className="relative h-[340px] overflow-hidden rounded-2xl">
            <Image src={uos2} alt="Graduates" fill className="object-cover" />
          </div>
        </div>
      </section>
    </>
  );
}
