import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../../lib/auth";
import { connectDB } from "../../lib/db";
import News from "../../models/News";
import Event from "../../models/Event";
import Department from "../../models/Department";
import Faculty from "../../models/Faculty";
import {
  Newspaper,
  CalendarDays,
  Building2,
  Users,
  ExternalLink,
  PenSquare,
} from "lucide-react";
export const dynamic = "force-dynamic";
export default async function Admin() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  let counts = [0, 0, 0, 0];
  try {
    await connectDB();
    counts = await Promise.all([
      News.countDocuments(),
      Event.countDocuments(),
      Department.countDocuments(),
      Faculty.countDocuments(),
    ]);
  } catch {}
  const cards = [
    ["News articles", counts[0], Newspaper],
    ["Events", counts[1], CalendarDays],
    ["Departments", counts[2], Building2],
    ["Faculty", counts[3], Users],
  ];
  return (
    <main className="min-h-[75vh] bg-ivory py-12">
      <div className="container-shell">
        <div className="flex flex-wrap justify-between gap-4">
          <div>
            <p className="eyebrow">Content management</p>
            <h1 className="mt-2 font-serif text-4xl text-navy-900">
              Welcome back.
            </h1>
            <p className="mt-2 text-sm text-slate-500">{session.email}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/"
              className="rounded-full border bg-white px-5 py-3 text-xs font-bold"
            >
              View website
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button className="rounded-full bg-navy-900 px-5 py-3 text-xs font-bold text-white">
                Sign out
              </button>
            </form>
          </div>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([label, value, Icon]) => (
            <div key={label} className="rounded-2xl bg-white p-6 shadow-sm">
              <Icon className="text-gold-600" />
              <p className="mt-5 font-serif text-4xl text-navy-900">{value}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </div>
        <section className="mt-10 rounded-2xl bg-white p-7 shadow-sm">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Manage your website</p>
              <h2 className="mt-2 font-serif text-2xl text-navy-900">
                Content management
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Publish new stories, events and university information.
              </p>
            </div>
            <Link
              href="/admin/content"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-xs font-bold uppercase text-white"
            >
              <PenSquare size={15} /> Open content studio
            </Link>
          </div>
          <h2 className="font-serif text-2xl text-navy-900">
            Developer API endpoints
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Authenticated administrators can create, update and delete content
            using these endpoints.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {["news", "events", "departments", "faculty", "programs"].map(
              (x) => (
                <Link
                  key={x}
                  href={`/api/${x}`}
                  className="flex justify-between rounded-xl border p-4 text-sm font-semibold capitalize text-navy-900"
                >
                  {x}
                  <ExternalLink size={14} />
                </Link>
              ),
            )}
          </div>
          <p className="mt-5 text-xs leading-6 text-slate-400">
            Use the content studio to create and publish entries. API endpoints
            remain protected for administrator-only write operations.
          </p>
        </section>
      </div>
    </main>
  );
}
