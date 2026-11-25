import { NextResponse } from "next/server";
export async function POST() {
  const r = NextResponse.json({ success: true });
  r.cookies.set("university_user", "", { path: "/", maxAge: 0 });
  return r;
}
