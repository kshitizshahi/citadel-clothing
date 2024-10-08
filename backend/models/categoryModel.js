import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      // enum: ["Men's Fashion", "Women's Fashion", "Kid's Wear"],
      maxLength: [50, "Category name cannot be more than 50 characters"],
      minLength: [3, "Category name should contain at least 3 characters"],
      trim: true,
    },
    categoryImage: {
      type: String,
      default: `uploads\\profile\\default.png`,
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
