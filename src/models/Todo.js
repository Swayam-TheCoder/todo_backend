import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    completed: Boolean,
    order: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);