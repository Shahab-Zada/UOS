import mongoose, { Schema } from "mongoose";
const schema = new Schema({ name: { type: String, required: true }, email: { type: String, required: true, unique: true, lowercase: true }, password: { type: String, required: true }, role: { type: String, default: 'admin' } }, { timestamps: true });
export default mongoose.models.Admin || mongoose.model("Admin", schema);
