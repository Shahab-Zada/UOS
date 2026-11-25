import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
export function DepartmentCard({ item }) {
  return (
    <Link
      href={`/departments#${item.short.toLowerCase()}`}
      className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-52">
        <Image
          src={
            item.imageUrl ||
            item.image ||
            "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85"
          }
          alt={item.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
          {item.short} Department
        </p>
        <h3 className="mt-2 font-serif text-2xl text-navy-900">{item.name}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          {item.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-navy-900">
          Explore department <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}
export function NewsCard({ item }) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white">
      <div className="relative h-52">
        <Image
          src={
            item.imageUrl ||
            item.image ||
            "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=85"
          }
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
          {item.category} · {item.date}
        </p>
        <h3 className="mt-4 font-serif text-xl text-navy-900">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-500">{item.excerpt}</p>
      </div>
    </article>
  );
}
export function EventCard({ item }) {
  return (
    <article className="flex gap-5 border-b border-slate-200 py-5">
      {item.imageUrl || item.image ? (
        <img
          src={item.imageUrl || item.image}
          alt={item.title}
          className="h-24 w-28 shrink-0 rounded-xl object-cover"
        />
      ) : (
        <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl bg-ivory text-navy-900">
          <b className="font-serif text-2xl">
            {item.date ? new Date(item.date).getDate() : "—"}
          </b>
          <small className="text-[9px] font-bold uppercase">
            {item.date
              ? new Date(item.date).toLocaleDateString("en", { month: "short" })
              : "Event"}
          </small>
        </div>
      )}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
          {item.category}
        </p>
        <h3 className="mt-1 font-serif text-lg text-navy-900">{item.title}</h3>
        <p className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
          <span className="flex gap-1">
            <CalendarDays size={13} />
            {item.date
              ? new Date(item.date).toLocaleDateString("en", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : item.time}
          </span>
          <span className="flex gap-1">
            <MapPin size={13} />
            {item.location}
          </span>
        </p>
        {item.description && (
          <p className="mt-2 text-sm text-slate-500">{item.description}</p>
        )}
      </div>
    </article>
  );
}
