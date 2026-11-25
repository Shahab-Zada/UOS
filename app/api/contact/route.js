import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import ContactMessage from "../../../models/ContactMessage";
export async function POST(req) { try {
    const b = await req.json();
    if (!b.name || !b.email || !b.message)
        return NextResponse.json({ error: "Complete all required fields." }, { status: 400 });
    if (b.message.length > 5000)
        return NextResponse.json({ error: "Message too long." }, { status: 400 });
    await connectDB();
    await ContactMessage.create({ name: b.name, email: b.email, subject: b.subject, message: b.message });
    return NextResponse.json({ success: true }, { status: 201 });
}
catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Could not save message. Check database connection." }, { status: 500 });
} }
