import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail } from "lucide-react";
const cols = [
  [
    "Explore",
    ["About", "/about"],
    ["Academics", "/academics"],
    ["Departments", "/departments"],
    ["Research", "/research"],
  ],
  [
    "Discover",
    ["Campus life", "/campus-life"],
    ["Facilities", "/facilities"],
    ["News", "/news"],
    ["Events", "/events"],
  ],
  [
    "Information",
    ["Admissions", "/admissions"],
    ["Faculty", "/faculty"],
    ["Gallery", "/gallery"],
    ["Contact", "/contact"],
  ],
];
export default function Footer() {
  return (
    <footer className="bg-[#0b2032] text-white">
      <div className="container-shell grid gap-12 py-16 md:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <span className="rounded-xl bg-white/10 p-3 text-gold-500">
              <GraduationCap />
            </span>
            <span className="font-serif text-2xl">University of Swat</span>
          </Link>
          <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
            A community of curious minds, courageous ideas and meaningful
            discovery. Learn boldly. Lead thoughtfully. Make a difference.
          </p>
          <div className="mt-6 space-y-3 text-sm text-white/60">
            <p className="flex gap-3">
              <MapPin size={16} /> Charbagh, Swat, Khyber Pakhtunkhwa, Pakistan
            </p>
            <p className="flex gap-3">
              <Phone size={16} /> Please consult the official university
              directory
            </p>
            <p className="flex gap-3">
              <Mail size={16} /> Please use the official university contact
              channel
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {cols.map((c) => (
            <div key={c[0]}>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-widest text-gold-500">
                {c[0]}
              </h3>
              {c.slice(1).map((item) => (
                <Link
                  key={item[1]}
                  href={item[1]}
                  className="mb-4 block text-sm text-white/60 hover:text-white"
                >
                  {item[0]}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} University of Swat. All rights reserved.
      </div>
    </footer>
  );
}
