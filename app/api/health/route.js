import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
export async function GET() { try {
    await connectDB();
    return NextResponse.json({ status: "ok", database: "connected" });
}
catch {
    return NextResponse.json({ status: "error", database: "disconnected" }, { status: 503 });
} }
