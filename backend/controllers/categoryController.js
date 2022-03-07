import Category from "../models/CategoryModel.js";
import asyncHandler from "express-async-handler";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  console.log(name);

  const category = new Category({
    name,
  });
  const createdCategory = await category.save();
  // const data = defaultResponse(createdCategory);
  res.status(201).json({
    createdCategory,
    message: "Category created successfully",
  });
});

const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.find().select("-createdAt -updatedAt");

  if (category) {
    res.status(200).json({
      category,
      message: "Category fetched",
    });
  }
});

export { createCategory, getCategory };
