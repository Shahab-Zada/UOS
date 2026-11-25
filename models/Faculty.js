import mongoose, { Schema } from "mongoose";
const schema = new Schema({ name: { type: String, required: true }, role: String, department: String, image: { type: String, default: "" }, imageUrl: { type: String, default: "" }, cloudinaryPublicId: { type: String, default: "" }, bio: String, email: String, published: { type: Boolean, default: true } }, { timestamps: true });
export default mongoose.models.Faculty || mongoose.model("Faculty", schema);
