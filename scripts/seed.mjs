import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "node:fs";
function loadEnv() {
  try {
    for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {}
}
loadEnv();
if (!process.env.MONGODB_URI) {
  console.error("Set MONGODB_URI in .env.local");
  process.exit(1);
}
await mongoose.connect(process.env.MONGODB_URI);
const schema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
  },
  { timestamps: true },
);
const Admin = mongoose.models.Admin || mongoose.model("Admin", schema);
const email = (
  process.env.ADMIN_EMAIL || "admin@universityofswat.edu.pk"
).toLowerCase();
const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
await Admin.findOneAndUpdate(
  { email },
  {
    name: "University of Swat Administrator",
    email,
    password: await bcrypt.hash(password, 12),
    role: "admin",
  },
  { upsert: true, new: true },
);
console.log(
  "Admin created/updated:",
  email,
  "— change default password before deployment.",
);
await mongoose.disconnect();
