import mongoose, { Schema } from "mongoose";
const schema = new Schema({ slug: { type: String, unique: true }, title: String, content: String, published: { type: Boolean, default: true } }, { timestamps: true });
export default mongoose.models.Page || mongoose.model("Page", schema);
