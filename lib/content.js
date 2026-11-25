import { connectDB } from "./db";
export async function getPublished(Model, fallback = []) {
  try {
    await connectDB();
    const items = await Model.find({ published: true })
      .sort({ createdAt: -1 })
      .lean();
    return items.map((x) => ({
      ...x,
      _id: String(x._id),
      date: x.date ? new Date(x.date).toISOString() : x.date,
    }));
  } catch (error) {
    console.error("Content read failed:", error.message);
    return fallback;
  }
}
