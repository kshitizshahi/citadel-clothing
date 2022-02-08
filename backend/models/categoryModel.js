import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    subType: {
      type: String,
      required: true,
      enum: ["PANTS", "SHIRTS", "T-SHIRTS"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("category", categorySchema);

export default Category;
