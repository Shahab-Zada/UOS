import { NextResponse } from "next/server";
import { getSession } from "../lib/auth";
export async function adminOnly() {
  if (!(await getSession()))
    return NextResponse.json(
      { error: "Administrator sign-in required." },
      { status: 401 },
    );
  return null;
}
export function apiError(e) {
  console.error(e);
  return NextResponse.json(
    { error: e?.message || "Server error" },
    { status: 500 },
  );
}
