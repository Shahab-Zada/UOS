"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, LockKeyhole } from "lucide-react";
export default function Login() {
  const [email, setEmail] = useState("admin@universityofswat.edu.pk");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      router.push("/admin");
      router.refresh();
    } catch (e) {
      setError(e.message || "Sign in failed");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-ivory px-4 py-16">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl sm:p-10"
      >
        <Link href="/" className="mb-8 flex items-center gap-3">
          <span className="rounded-xl bg-navy-900 p-3 text-gold-500">
            <GraduationCap />
          </span>
          <span className="font-serif text-2xl text-navy-900">
            University of Swat
          </span>
        </Link>
        <LockKeyhole className="text-gold-600" />
        <h1 className="mt-4 font-serif text-3xl text-navy-900">
          Administrator sign in
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Manage the public university website.
        </p>
        <label className="mt-7 block text-xs font-semibold">
          Email
          <input
            className="form-input mt-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="mt-4 block text-xs font-semibold">
          Password
          <input
            className="form-input mt-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <button
          disabled={busy}
          className="mt-6 w-full rounded-full bg-navy-900 py-4 text-xs font-bold uppercase text-white"
        >
          {busy ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
