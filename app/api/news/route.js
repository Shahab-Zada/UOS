import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import { adminOnly, apiError } from "../../../lib/api";
import Model from "../../../models/News";
import { normalizeCloudinaryImage } from "../../../lib/cloudinary";
export async function GET(req) { try {
    const admin = req.nextUrl.searchParams.get("admin") === "1"; if (admin) { const denied = await adminOnly(); if (denied) return denied; }
    await connectDB();
    return NextResponse.json(await Model.find(admin ? {} : { published: true }).sort({ createdAt: -1 }).lean());
}
catch (e) {
    return apiError(e);
} }
export async function POST(req) { const denied = await adminOnly(); if (denied)
    return denied; try {
    await connectDB();
    return NextResponse.json(await Model.create(normalizeCloudinaryImage(await req.json())), { status: 201 });
}
catch (e) {
    return apiError(e);
} }
export async function PATCH(req) { const denied = await adminOnly(); if (denied)
    return denied; try {
    await connectDB();
    const { id, ...rawData } = await req.json();
    const data = normalizeCloudinaryImage(rawData);
    if (!id)
        return NextResponse.json({ error: "id required" }, { status: 400 });
    const item = await Model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!item)
        return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
}
catch (e) {
    return apiError(e);
} }
export async function DELETE(req) { const denied = await adminOnly(); if (denied)
    return denied; try {
    await connectDB();
    const id = req.nextUrl.searchParams.get("id");
    if (!id)
        return NextResponse.json({ error: "id required" }, { status: 400 });
    await Model.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
}
catch (e) {
    return apiError(e);
} }
