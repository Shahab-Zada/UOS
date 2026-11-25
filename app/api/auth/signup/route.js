import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "../../../../lib/db";
import User from "../../../../models/User";
export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password || password.length < 8)
      return NextResponse.json(
        {
          error:
            "Enter your name, a valid email and a password of at least 8 characters.",
        },
        { status: 400 },
      );
    await connectDB();
    if (await User.findOne({ email: email.toLowerCase() }))
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
    });
    const r = NextResponse.json({ success: true });
    r.cookies.set("university_user", user._id.toString(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 604800,
    });
    return r;
  } catch (e) {
    return NextResponse.json(
      { error: "Could not create account." },
      { status: 500 },
    );
  }
}
