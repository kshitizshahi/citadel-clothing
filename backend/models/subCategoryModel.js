import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },

    name: {
      type: String,
      required: true,
      // enum: ["Pants", "Shirts", "T-shirts"],
      maxLength: [50, "Sub category name cannot be more than 50 characters"],
      minLength: [3, "Sub category name should contain at least 3 characters"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const SubCategory = mongoose.model("Sub-Category", subCategorySchema);

export default SubCategory;
