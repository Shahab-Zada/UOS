import mongoose, { Schema } from "mongoose";
const schema = new Schema({ title: { type: String, required: true }, slug: { type: String, unique: true }, category: String, date: { type: Date, default: Date.now }, image: { type: String, default: "" }, imageUrl: { type: String, default: "" }, cloudinaryPublicId: { type: String, default: "" }, excerpt: String, body: String, published: { type: Boolean, default: true } }, { timestamps: true });
export default mongoose.models.News || mongoose.model("News", schema);
