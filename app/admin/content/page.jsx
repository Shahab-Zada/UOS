import { redirect } from "next/navigation";

import { getSession } from "../../../lib/auth";
import AdminContentManager from "../../../components/AdminContentManager";
export const dynamic = "force-dynamic";
export default async function ContentPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return (
    <main className="min-h-screen bg-ivory py-12">
      <div className="container-shell">
        <a
          href="/admin"
          className="text-xs font-bold uppercase tracking-wider text-gold-600"
        >
          ← Back to dashboard
        </a>
        <AdminContentManager />
      </div>
    </main>
  );
}
