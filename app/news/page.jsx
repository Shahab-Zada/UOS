import PageHero from "../../components/PageHero";
import { NewsCard } from "../../components/Cards";
import { news as fallbackNews } from "../../lib/data";
import { getPublished } from "../../lib/content";
import News from "../../models/News";
export const metadata = { title: "News" };
export const dynamic = "force-dynamic";
export default async function NewsPage() {
  const news = await getPublished(News, fallbackNews);
  return (
    <>
      <PageHero
        eyebrow="The latest from University of Swat"
        title="News, ideas & achievements."
        description="Stories that celebrate our community, share discoveries and keep you connected."
        image="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="section-pad bg-ivory">
        <div className="container-shell grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <NewsCard key={n._id || n.slug || n.title} item={n} />
          ))}
        </div>
      </section>
    </>
  );
}
