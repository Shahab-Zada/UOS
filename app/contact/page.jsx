"use client";
import { useState } from "react";
import PageHero from "../../components/PageHero";
import { Mail, MapPin, Phone, Send } from "lucide-react";
export default function Contact() {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setStatus("");
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form).entries());
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error || "Unable to send");
      setStatus("Thank you. Your message has been received.");
      form.reset();
    } catch (err) {
      setStatus(err.message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="We would love to hear from you."
        description="Questions, ideas or a simple hello — our team is here to help."
        image="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="eyebrow">Contact information</p>
            <h2 className="mt-4 font-serif text-4xl text-navy-900">
              Let's start a conversation.
            </h2>
            <p className="mt-5 text-sm leading-7 text-slate-500">
              Reach out for general information, admissions guidance or
              partnership enquiries.
            </p>
            <div className="mt-9 space-y-6">
              {[
                [
                  MapPin,
                  "Visit us",
                  "Charbagh, Swat, Khyber Pakhtunkhwa, Pakistan",
                ],
                [
                  Phone,
                  "Call us",
                  "Please consult the official university directory",
                ],
                [
                  Mail,
                  "Email us",
                  "Please use the official university contact channel",
                ],
              ].map(([Icon, label, value]) => (
                <div key={label} className="flex gap-4">
                  <span className="rounded-xl bg-ivory p-3 text-gold-600">
                    <Icon size={19} />
                  </span>
                  <div>
                    <b className="text-xs uppercase tracking-widest">{label}</b>
                    <p className="mt-1 text-sm text-slate-500">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form
            onSubmit={submit}
            className="rounded-2xl border p-6 shadow-xl sm:p-9"
          >
            <h3 className="font-serif text-2xl text-navy-900">
              Send us a message
            </h3>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="text-xs font-semibold">
                Your name
                <input
                  name="name"
                  required
                  className="form-input mt-2"
                  placeholder="Full name"
                />
              </label>
              <label className="text-xs font-semibold">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  className="form-input mt-2"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="mt-5 block text-xs font-semibold">
              Subject
              <input
                name="subject"
                className="form-input mt-2"
                placeholder="How can we help?"
              />
            </label>
            <label className="mt-5 block text-xs font-semibold">
              Message
              <textarea
                name="message"
                required
                rows={5}
                className="form-input mt-2"
                placeholder="Write your message..."
              />
            </label>
            {status && <p className="mt-4 text-sm">{status}</p>}
            <button
              disabled={busy}
              className="mt-6 inline-flex items-center gap-3 rounded-full bg-navy-900 px-7 py-4 text-xs font-bold uppercase text-white"
            >
              {busy ? "Sending..." : "Send message"} <Send size={14} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
