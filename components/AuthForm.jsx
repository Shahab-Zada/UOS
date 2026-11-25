"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap } from "lucide-react";
export default function AuthForm({ mode }) {
  const signup = mode === "signup",
    [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(false),
    router = useRouter();
  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const r = await fetch(signup ? "/api/auth/signup" : "/api/auth/signin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }),
        d = await r.json();
      if (!r.ok) throw Error(d.error);
      router.push("/");
      router.refresh();
    } catch (e) {
      setError(e.message);
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
          <span className="font-serif text-xl text-navy-900">
            University of Swat
          </span>
        </Link>
        <p className="eyebrow">Student community</p>
        <h1 className="mt-3 font-serif text-3xl text-navy-900">
          {signup ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          {signup
            ? "Join the University of Swat community."
            : "Sign in to your university account."}
        </p>
        {signup && (
          <label className="mt-7 block text-xs font-semibold">
            Full name
            <input
              className="form-input mt-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        )}
        <label className="mt-5 block text-xs font-semibold">
          Email address
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
            minLength={8}
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
          {busy ? "Please wait…" : signup ? "Create account" : "Sign in"}
        </button>
        <p className="mt-6 text-center text-sm text-slate-500">
          {signup ? "Already registered?" : "New to the university?"}{" "}
          <Link
            className="font-bold text-gold-600"
            href={signup ? "/login" : "/signup"}
          >
            {signup ? "Login" : "Create an account"}
          </Link>
        </p>
      </form>
    </main>
  );
}
