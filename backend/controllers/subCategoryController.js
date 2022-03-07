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
  const subCategory = await SubCategory.findById(req.params.id).populate(
    "category",
    "_id name"
  );
  if (subCategory) {
    const data = defaultResponse(Category);

    res.status(200).json({
      data,
      message: "Category fetched",
    });
  }
});

export { createSubCategory, getSubCategory };
