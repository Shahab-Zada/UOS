import mongoose, { Schema } from "mongoose";
const schema = new Schema({ title: { type: String, required: true }, date: Date, time: String, location: String, category: String, description: String, image: { type: String, default: "" }, imageUrl: { type: String, default: "" }, cloudinaryPublicId: { type: String, default: "" }, published: { type: Boolean, default: true } }, { timestamps: true });
export default mongoose.models.Event || mongoose.model("Event", schema);
