import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Define MONGODB_URI in .env.local");
const cache =
  global.mongooseCache ||
  (global.mongooseCache = { conn: null, promise: null });
export async function connectDB() {
  if (cache.conn) return cache.conn;
  if (!cache.promise) cache.promise = mongoose.connect(uri);
  cache.conn = await cache.promise;
  return cache.conn;
}
