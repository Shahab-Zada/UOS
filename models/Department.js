import mongoose, { Schema } from "mongoose";

function makeSlug(value = "") {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const schema = new Schema({
  name: { type: String, required: true, trim: true },
  // Always store a usable slug; the API and this hook both generate it.
  slug: { type: String, required: true, unique: true, trim: true },
  short: String,
  description: String,
  image: String,
  imageUrl: { type: String, default: "" },
  cloudinaryPublicId: { type: String, default: "" },
  programs: [String],
  published: { type: Boolean, default: true }
}, { timestamps: true });

schema.pre("validate", function () {
  if (!this.slug?.trim() && this.name) this.slug = makeSlug(this.name);
});

export default mongoose.models.Department || mongoose.model("Department", schema);
