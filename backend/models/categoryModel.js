import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ["Men's Fashion", "Women's Fashion", "Kid's Wear"],
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
