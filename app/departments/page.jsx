import PageHero from "../../components/PageHero";
import { departments as fallbackDepartments } from "../../lib/data";
import { getPublished } from "../../lib/content";
import Department from "../../models/Department";
import { DepartmentCard } from "../../components/Cards";
export const metadata = { title: "Departments" };
export const dynamic = "force-dynamic";
export default async function Departments() {
  const departments = await getPublished(Department, fallbackDepartments);
  return (
    <>
      <PageHero
        eyebrow="Our academic community"
        title="Explore our departments."
        description="Interdisciplinary thinking begins with strong academic foundations and passionate educators."
        image="https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1800&q=85"
      />
      <section className="section-pad bg-ivory">
        <div className="container-shell grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => (
            <div id={d.short.toLowerCase()} key={d.short}>
              <DepartmentCard item={d} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
