import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/db";
import Admin from "../../../../models/Admin";
import { createToken } from "../../../../lib/auth";
export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 },
      );
    await connectDB();
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await bcrypt.compare(password, admin.password)))
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    const token = await createToken({
      id: admin._id.toString(),
      email: admin.email,
    });
    const res = NextResponse.json({ success: true });
    res.cookies.set("univision_admin", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 604800,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Unable to sign in." }, { status: 500 });
  }
}
