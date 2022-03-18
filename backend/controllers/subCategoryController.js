import SubCategory from "../models/subCategory.js";
import asyncHandler from "express-async-handler";

const defaultResponse = (subCategory) => {
  return {
    _id: subCategory._id,
    category: subCategory.category,
    name: subCategory.name,
  };
};

const createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;

  const subCategory = new SubCategory({
    category,
    name,
  });
  const createdSubCategory = await subCategory.save();
  const data = defaultResponse(createdSubCategory);
  res.status(201).json({
    data,
    message: "Sub-Category created successfully",
  });
});

const getSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.find({
    category: req.params.id,
  });

  if (subCategory) {
    res.status(200).json({
      data: subCategory,
      message: "Category fetched",
    });
  } else {
    res.status(404).json({
      message: "Sub-category not found",
    });
  }
});

export { createSubCategory, getSubCategory };
