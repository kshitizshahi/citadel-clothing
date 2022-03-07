import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },

    name: {
      type: String,
      required: true,
      unique: true,
      enum: ["Pants", "Shirts", "T-shirts"],
    },
  },
  {
    timestamps: true,
  }
);

const SubCategory = mongoose.model("Sub-Category", subCategorySchema);

export default SubCategory;
