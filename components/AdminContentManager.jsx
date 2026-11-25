"use client";
import { useEffect, useMemo, useState } from "react";
import {
  ImagePlus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  X,
} from "lucide-react";

const types = {
  news: {
    label: "News",
    endpoint: "/api/news",
    title: "title",
    fields: ["title", "category", "date", "excerpt", "body", "image"],
    areas: ["excerpt", "body"],
  },
  events: {
    label: "Events",
    endpoint: "/api/events",
    title: "title",
    fields: [
      "title",
      "date",
      "time",
      "location",
      "category",
      "description",
      "image",
    ],
    areas: ["description"],
  },
  departments: {
    label: "Departments",
    endpoint: "/api/departments",
    title: "name",
    fields: ["name", "short", "description", "image"],
    areas: ["description"],
  },
  faculty: {
    label: "Faculty",
    endpoint: "/api/faculty",
    title: "name",
    fields: ["name", "role", "department", "email", "bio", "image"],
    areas: ["bio"],
  },
  programs: {
    label: "Programs",
    endpoint: "/api/programs",
    title: "name",
    fields: ["name", "level", "duration", "department", "description", "image"],
    areas: ["description"],
  },
  gallery: {
    label: "Gallery",
    endpoint: "/api/gallery",
    title: "title",
    fields: ["title", "category", "image"],
    areas: [],
  },
  research: {
    label: "Research",
    endpoint: "/api/research",
    title: "title",
    fields: ["title", "area", "summary", "image"],
    areas: ["summary"],
  },
  announcements: {
    label: "Announcements",
    endpoint: "/api/announcements",
    title: "title",
    fields: ["title", "body", "link", "image"],
    areas: ["body"],
  },
};
const labels = {
  title: "Title",
  name: "Name",
  short: "Short name / code",
  category: "Category",
  date: "Date",
  time: "Time",
  location: "Location",
  excerpt: "Short summary",
  body: "Full article",
  image: "Image",
  description: "Description",
  role: "Role / designation",
  department: "Department",
  email: "Email",
  bio: "Biography",
  level: "Study level",
  duration: "Duration",
  area: "Research area",
  summary: "Summary",
  link: "Optional link",
};
const empty = {};

export default function AdminContentManager() {
  const [type, setType] = useState("news"),
    [form, setForm] = useState(empty),
    [items, setItems] = useState([]),
    [editing, setEditing] = useState(null),
    [message, setMessage] = useState(""),
    [busy, setBusy] = useState(false),
    [uploading, setUploading] = useState(false);
  const current = types[type];
  async function load() {
    setBusy(true);
    try {
      const r = await fetch(`${current.endpoint}?admin=1`, {
        cache: "no-store",
      });
      const d = await r.json();
      if (!r.ok) throw Error(d.error || "Could not load entries");
      setItems(d);
    } catch (e) {
      setMessage(e.message);
    } finally {
      setBusy(false);
    }
  }
  useEffect(() => {
    setForm({});
    setEditing(null);
    setMessage("");
    load();
  }, [type]);
  function change(k, v) {
    setForm((old) => ({ ...old, [k]: v }));
  }
  async function uploadImage(file) {
    if (!file) return;
    setUploading(true);
    setMessage("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch("/api/upload", { method: "POST", body: fd });
      const d = await r.json();
      if (!r.ok) throw Error(d.error || "Upload failed");
      setForm((old) => ({
        ...old,
        image: d.url,
        imageUrl: d.url,
        cloudinaryPublicId: d.publicId || "",
      }));
      setMessage(
        "Image uploaded to Cloudinary. CDN URL and Cloudinary public ID are ready to save.",
      );
    } catch (e) {
      setMessage(e.message);
    } finally {
      setUploading(false);
    }
  }
  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const payload = { ...form, published: form.published !== false };
      if (payload.image || payload.imageUrl) {
        payload.imageUrl = payload.imageUrl || payload.image;
        payload.image = payload.imageUrl;
      }
      const r = await fetch(current.endpoint, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing ? { id: editing, ...payload } : payload),
      });
      const d = await r.json();
      if (!r.ok) throw Error(d.error || "Could not save content");
      setMessage(
        editing
          ? "Changes saved and published status updated."
          : "Content published successfully.",
      );
      setForm({});
      setEditing(null);
      await load();
    } catch (e) {
      setMessage(e.message);
    } finally {
      setBusy(false);
    }
  }
  function edit(item) {
    const values = { ...item };
    delete values._id;
    delete values.__v;
    delete values.createdAt;
    delete values.updatedAt;
    if (values.date)
      values.date = new Date(values.date).toISOString().slice(0, 10);
    setForm(values);
    setEditing(item._id);
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  async function remove(item) {
    if (
      !window.confirm(
        `Delete "${item[current.title] || "this entry"}" permanently?`,
      )
    )
      return;
    setBusy(true);
    try {
      const r = await fetch(`${current.endpoint}?id=${item._id}`, {
        method: "DELETE",
      });
      const d = await r.json();
      if (!r.ok) throw Error(d.error || "Delete failed");
      setItems((old) => old.filter((x) => x._id !== item._id));
      setMessage("Entry deleted.");
    } catch (e) {
      setMessage(e.message);
    } finally {
      setBusy(false);
    }
  }
  async function toggle(item) {
    setBusy(true);
    try {
      const r = await fetch(current.endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item._id, published: !item.published }),
      });
      const d = await r.json();
      if (!r.ok) throw Error(d.error || "Could not update status");
      setItems((old) => old.map((x) => (x._id === item._id ? d : x)));
      setMessage(
        d.published
          ? "Entry is now visible on the website."
          : "Entry has been unpublished.",
      );
    } catch (e) {
      setMessage(e.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <section className="mt-8 space-y-8">
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="eyebrow">Website content studio</p>
            <h2 className="mt-2 font-serif text-2xl text-navy-900">
              {editing ? "Edit content" : "Create and publish content"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Create, edit, publish, unpublish and delete content. Published
              entries are loaded by the corresponding public page.
            </p>
          </div>
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        </div>
        <label className="mt-6 block text-xs font-bold">
          Content type
          <select
            className="form-input mt-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {Object.entries(types).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </label>
        <form onSubmit={save} className="mt-5 grid gap-4 sm:grid-cols-2">
          {current.fields.map((f) => (
            <label
              key={f}
              className={`block text-xs font-semibold ${current.areas.includes(f) ? "sm:col-span-2" : ""}`}
            >
              {labels[f] || f}
              {f === "image" ? (
                <div className="mt-2 space-y-3">
                  <input
                    type="url"
                    className="form-input"
                    placeholder="Cloudinary image URL (or upload below)"
                    value={form.imageUrl || form.image || ""}
                    onChange={(e) => {
                      change("image", e.target.value);
                      change("imageUrl", e.target.value);
                      if (!e.target.value) change("cloudinaryPublicId", "");
                    }}
                  />
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed p-4 text-xs font-semibold text-slate-600">
                    <ImagePlus size={18} />
                    {uploading
                      ? "Uploading image…"
                      : "Choose image to upload to Cloudinary"}
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      disabled={uploading}
                      onChange={(e) => uploadImage(e.target.files?.[0])}
                    />
                  </label>
                  {(form.imageUrl || form.image) && (
                    <img
                      src={form.imageUrl || form.image}
                      alt="Selected upload preview"
                      className="h-36 w-full rounded-xl object-cover"
                    />
                  )}
                </div>
              ) : current.areas.includes(f) ? (
                <textarea
                  rows={4}
                  className="form-input mt-2"
                  value={form[f] || ""}
                  onChange={(e) => change(f, e.target.value)}
                  required={["body", "description", "summary"].includes(f)}
                />
              ) : (
                <input
                  type={
                    f === "date"
                      ? "date"
                      : f === "email"
                        ? "email"
                        : f === "link"
                          ? "url"
                          : "text"
                  }
                  className="form-input mt-2"
                  value={form[f] || ""}
                  onChange={(e) => change(f, e.target.value)}
                  required={["title", "name", "short", "date"].includes(f)}
                />
              )}
            </label>
          ))}
          <label className="flex items-center gap-2 text-xs font-semibold sm:col-span-2">
            <input
              type="checkbox"
              checked={form.published !== false}
              onChange={(e) => change("published", e.target.checked)}
            />{" "}
            Publish immediately (visible to website visitors)
          </label>
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button
              disabled={busy || uploading}
              className="rounded-full bg-navy-900 px-7 py-4 text-xs font-bold uppercase tracking-wider text-white"
            >
              {busy ? "Saving…" : editing ? "Save changes" : "Publish content"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={() => {
                  setForm({});
                  setEditing(null);
                }}
                className="inline-flex items-center gap-2 rounded-full border px-6 py-4 text-xs font-bold"
              >
                <X size={14} /> Cancel edit
              </button>
            )}
          </div>
        </form>
        {message && (
          <p
            role="status"
            className="mt-4 rounded-xl bg-ivory p-3 text-sm text-navy-900"
          >
            {message}
          </p>
        )}
      </div>
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="eyebrow">Existing entries</p>
            <h2 className="mt-2 font-serif text-2xl text-navy-900">
              {current.label} ({items.length})
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {busy ? "Loading…" : "Manage published and draft content"}
          </span>
        </div>
        <div className="mt-5 divide-y">
          {items.length === 0 ? (
            <p className="py-8 text-sm text-slate-500">
              No entries found for this content type yet.
            </p>
          ) : (
            items.map((item) => (
              <article
                key={item._id}
                className="flex flex-wrap items-center justify-between gap-4 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  {(item.imageUrl || item.image) && (
                    <img
                      src={item.imageUrl || item.image}
                      alt=""
                      className="h-14 w-16 rounded-lg object-cover"
                    />
                  )}
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-navy-900">
                      {item[current.title]}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">
                      {item.category ||
                        item.department ||
                        item.date ||
                        "Website content"}{" "}
                      ·{" "}
                      {item.published === false
                        ? "Draft / hidden"
                        : "Published"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    title={item.published === false ? "Publish" : "Unpublish"}
                    onClick={() => toggle(item)}
                    className="rounded-lg border p-2 text-slate-600"
                  >
                    {item.published === false ? (
                      <Eye size={16} />
                    ) : (
                      <EyeOff size={16} />
                    )}
                  </button>
                  <button
                    type="button"
                    title="Edit"
                    onClick={() => edit(item)}
                    className="rounded-lg border p-2 text-slate-600"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    type="button"
                    title="Delete"
                    onClick={() => remove(item)}
                    className="rounded-lg border p-2 text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
