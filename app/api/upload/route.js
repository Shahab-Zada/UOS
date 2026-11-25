import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { adminOnly } from "../../../lib/api";
export const runtime = "nodejs";
export async function POST(req) {
  const denied = await adminOnly(); if (denied) return denied;
  try {
    const cloud = process.env.CLOUDINARY_CLOUD_NAME, key = process.env.CLOUDINARY_API_KEY, secret = process.env.CLOUDINARY_API_SECRET;
    if (!cloud || !key || !secret) return NextResponse.json({ error: "Configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in .env.local first." }, { status: 503 });
    const form = await req.formData(); const file = form.get("file");
    if (!file || typeof file.arrayBuffer !== "function") return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    if (!file.type?.startsWith("image/")) return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: "Image must be 10 MB or smaller." }, { status: 400 });
    const timestamp = Math.floor(Date.now()/1000), folder = "university-of-swat";
    const signature = createHash("sha1").update(`folder=${folder}&timestamp=${timestamp}${secret}`).digest("hex");
    const body = new FormData(); body.append("file", file); body.append("api_key", key); body.append("timestamp", String(timestamp)); body.append("folder", folder); body.append("signature", signature);
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/image/upload`, { method: "POST", body });
    const result = await response.json(); if (!response.ok) return NextResponse.json({ error: result.error?.message || "Cloudinary upload failed." }, { status: 502 });
    return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
  } catch (error) { console.error(error); return NextResponse.json({ error: "Image upload failed." }, { status: 500 }); }
}
