import { NextResponse } from "next/server";
export async function POST() {
  const r = NextResponse.redirect(
    new URL(
      "/admin/login",
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ),
  );
  r.cookies.set("univision_admin", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return r;
}
