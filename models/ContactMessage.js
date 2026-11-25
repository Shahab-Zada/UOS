import mongoose, { Schema } from "mongoose";
const schema = new Schema({ name: { type: String, required: true }, email: { type: String, required: true }, subject: String, message: { type: String, required: true }, status: { type: String, default: 'new' } }, { timestamps: true });
export default mongoose.models.ContactMessage || mongoose.model("ContactMessage", schema);
