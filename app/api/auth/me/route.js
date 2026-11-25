import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
export async function GET() {
  try {
    const id = (await cookies()).get("university_user")?.value;
    if (!id) return NextResponse.json({ user: null });
    await connectDB();
    const u = await User.findById(id).select("name email role").lean();
    return NextResponse.json({ user: u || null });
  } catch {
    return NextResponse.json({ user: null });
  }
}
