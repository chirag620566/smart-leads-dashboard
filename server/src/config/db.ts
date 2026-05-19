import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("🔥 DB START");

    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI missing");
    }

    await mongoose.connect(uri);

    console.log("✅ DB CONNECTED");
  } catch (err) {
    console.log("❌ DB ERROR:", err);
  }
};