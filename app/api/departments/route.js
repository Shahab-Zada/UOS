import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import { adminOnly, apiError } from "../../../lib/api";
import Model from "../../../models/Department";

function slugify(value = "") {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uniqueSlug(value, excludeId = null) {
  const base = slugify(value);
  if (!base) return "";

  let candidate = base;
  let suffix = 2;
  while (await Model.exists({
    slug: candidate,
    ...(excludeId ? { _id: { $ne: excludeId } } : {})
  })) {
    candidate = `${base}-${suffix++}`;
  }
  return candidate;
}

function duplicateResponse(error) {
  if (error?.code === 11000) {
    return NextResponse.json(
      { error: "A department with this name/slug already exists. Please use a different department name." },
      { status: 409 }
    );
  }
  return apiError(error);
}

export async function GET(req) {
  try {
    const admin = req.nextUrl.searchParams.get("admin") === "1";
    if (admin) {
      const denied = await adminOnly();
      if (denied) return denied;
    }
    await connectDB();
    const departments = await Model.find(admin ? {} : { published: true })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(departments);
  } catch (error) {
    return apiError(error);
  }
}

export async function POST(req) {
  const denied = await adminOnly();
  if (denied) return denied;

  try {
    await connectDB();
    const data = await req.json();
    // Accept both legacy `image` and explicit Cloudinary `imageUrl` fields.
    data.imageUrl = data.imageUrl || data.image || "";
    data.image = data.imageUrl;
    data.cloudinaryPublicId = data.cloudinaryPublicId || "";
    if (!data.name?.trim()) {
      return NextResponse.json({ error: "Department name is required." }, { status: 400 });
    }

    // The admin form does not need to send a slug; generate a unique one here.
    data.slug = await uniqueSlug(data.slug || data.name);
    if (!data.slug) {
      return NextResponse.json({ error: "Please enter a valid department name." }, { status: 400 });
    }

    const department = await Model.create(data);
    return NextResponse.json(department, { status: 201 });
  } catch (error) {
    return duplicateResponse(error);
  }
}

export async function PATCH(req) {
  const denied = await adminOnly();
  if (denied) return denied;

  try {
    await connectDB();
    const { id, ...data } = await req.json();
    if (data.imageUrl !== undefined || data.image !== undefined) {
      data.imageUrl = data.imageUrl || data.image || "";
      data.image = data.imageUrl;
      if (!data.imageUrl) data.cloudinaryPublicId = "";
    }
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

    const existing = await Model.findById(id);
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Repair older records that may have been saved without a slug.
    if (data.name !== undefined || data.slug !== undefined || !existing.slug) {
      const nameForSlug = data.slug || data.name || existing.name;
      data.slug = await uniqueSlug(nameForSlug, existing._id);
      if (!data.slug) {
        return NextResponse.json({ error: "Please enter a valid department name." }, { status: 400 });
      }
    }

    Object.assign(existing, data);
    await existing.save();
    return NextResponse.json(existing);
  } catch (error) {
    return duplicateResponse(error);
  }
}

export async function DELETE(req) {
  const denied = await adminOnly();
  if (denied) return denied;

  try {
    await connectDB();
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    await Model.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return apiError(error);
  }
}
