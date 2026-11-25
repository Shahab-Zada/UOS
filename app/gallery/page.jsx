import Image from "next/image";
import PageHero from "../../components/PageHero";
import SectionHeading from "../../components/SectionHeading";
import GalleryItem from "../../models/Gallery";
import { getPublished } from "../../lib/content";
const photos = [
  [
    "Campus architecture",
    "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85",
  ],
  [
    "Learning together",
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=85",
  ],
  [
    "Research in action",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=85",
  ],
  [
    "Campus community",
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=85",
  ],
  [
    "Graduation day",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=85",
  ],
  [
    "Creative spaces",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=85",
  ],
];
export const metadata = { title: "Gallery" };
export const dynamic = "force-dynamic";
export default async function Gallery() {
  const galleryItems = await getPublished(
    GalleryItem,
    photos.map(([title, image]) => ({ title, image })),
  );
  return (
    <>
      <PageHero
        eyebrow="Life in pictures"
        title="A closer look at University of Swat."
        description="Moments, places and people that make our university community distinctive."
        image="https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="section-pad bg-ivory">
        <div className="container-shell">
          <SectionHeading
            eyebrow="University gallery"
            title="Discover our world"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <div
                key={item._id || item.title}
                className="group relative h-72 overflow-hidden rounded-2xl"
              >
                {item.imageUrl || item.image ? (
                  <Image
                    src={item.imageUrl || item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-slate-200" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
                <p className="absolute bottom-5 left-5 font-serif text-xl text-white">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
