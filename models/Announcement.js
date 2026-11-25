import mongoose, { Schema } from "mongoose";
const schema = new Schema({ title: { type: String, required: true }, body: String, link: String, image: { type: String, default: "" }, imageUrl: { type: String, default: "" }, cloudinaryPublicId: { type: String, default: "" }, published: { type: Boolean, default: true } }, { timestamps: true });
export default mongoose.models.Announcement || mongoose.model("Announcement", schema);
