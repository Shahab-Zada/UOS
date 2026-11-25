import PageHero from "../../components/PageHero";
import SectionHeading from "../../components/SectionHeading";
import { EventCard } from "../../components/Cards";
import { events as fallbackEvents } from "../../lib/data";
import { getPublished } from "../../lib/content";
import Event from "../../models/Event";
export const metadata = { title: "Events" };
export const dynamic = "force-dynamic";
export default async function Events() {
  const events = await getPublished(Event, fallbackEvents);
  return (
    <>
      <PageHero
        eyebrow="On campus"
        title="Gather, exchange, celebrate."
        description="Discover talks, conferences, performances and community moments happening at University of Swat."
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="section-pad">
        <div className="container-shell max-w-4xl">
          <SectionHeading eyebrow="Save the date" title="Upcoming events" />
          {events.map((e) => (
            <EventCard key={e._id || e.title} item={e} />
          ))}
        </div>
      </section>
    </>
  );
}
