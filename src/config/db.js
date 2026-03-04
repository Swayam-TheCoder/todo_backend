import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // ⏱ fail fast (5s)
      socketTimeoutMS: 45000,
    });

    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

/* 🔥 Connection event logs (VERY IMPORTANT) */
mongoose.connection.on("connected", () => {
  console.log("🟢 Mongoose connected");
});

mongoose.connection.on("error", (err) => {
  console.error("🔴 Mongoose error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("🟡 Mongoose disconnected");
});

export default connectDB;