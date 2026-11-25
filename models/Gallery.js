import mongoose, { Schema } from "mongoose";
const schema = new Schema({ title: String, category: String, image: { type: String, default: "" }, imageUrl: { type: String, default: "" }, cloudinaryPublicId: { type: String, default: "" }, published: { type: Boolean, default: true } }, { timestamps: true });
export default mongoose.models.Gallery || mongoose.model("Gallery", schema);
