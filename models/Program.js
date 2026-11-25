import mongoose, { Schema } from "mongoose";
const schema = new Schema({ name: { type: String, required: true }, level: String, duration: String, department: String, description: String, image: { type: String, default: "" }, imageUrl: { type: String, default: "" }, cloudinaryPublicId: { type: String, default: "" }, published: { type: Boolean, default: true } }, { timestamps: true });
export default mongoose.models.Program || mongoose.model("Program", schema);
