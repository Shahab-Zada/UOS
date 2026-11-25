import PageHero from "../../components/PageHero";
import Announcement from "../../models/Announcement";
import { getPublished } from "../../lib/content";
export const metadata = { title: "Announcements" };
export const dynamic = "force-dynamic";
export default async function AnnouncementsPage() {
  const items = await getPublished(Announcement, []);
  return (
    <>
      <PageHero
        eyebrow="Official updates"
        title="University announcements."
        description="Notices and important updates from the University of Swat."
        image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="section-pad bg-ivory">
        <div className="container-shell max-w-4xl space-y-4">
          {items.length ? (
            items.map((item) => (
              <article
                key={item._id}
                className="rounded-2xl bg-white p-7 shadow-sm"
              >
                {(item.imageUrl || item.image) && (
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.title}
                    className="mb-5 h-56 w-full rounded-xl object-cover"
                  />
                )}
                <h2 className="font-serif text-2xl text-navy-900">
                  {item.title}
                </h2>
                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                  {item.body}
                </p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-xs font-bold uppercase text-gold-600"
                  >
                    Read more →
                  </a>
                )}
              </article>
            ))
          ) : (
            <p className="rounded-2xl bg-white p-8 text-sm text-slate-500">
              There are no current announcements.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
