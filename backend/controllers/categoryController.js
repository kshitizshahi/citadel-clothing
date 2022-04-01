import Category from "../models/CategoryModel.js";
import asyncHandler from "express-async-handler";
import fs from "fs";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = new Category({
    name,
    categoryImage: req?.file?.path,
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

const searchCategory = asyncHandler(async (req, res) => {
  const { keywords } = req.params;
  const category = await Category.find({
    name: { $regex: keywords, $options: "i" },
  });

  if (category) {
    res.status(200).json({
      category,
      message: "Category found",
    });
  } else {
    res.status(404).json({
      message: "Category not found",
    });
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (category) {
    fs.unlink(category.categoryImage, (err) => {
      if (err) {
        return console.error(err);
      }
    });
    await category.remove();
    res.status(200).json({
      message: "Category deleted",
    });
  } else {
    res.status(404).json({
      message: "Category not found",
    });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { name } = req.body;

  const category = await Category.findById({ _id: categoryId });
  const deleteImage = category.categoryImage;

  if (category) {
    // let current_category_name = category.name;

    // const otherCategory = await Category.find({
    //   name: { $ne: current_category_name },
    // });
    // let duplicate = false;

    // for (let i = 0; i < otherCategory.length; i++) {
    //   if (otherCategory[i].name === name) {
    //     duplicate = true;
    //     break;
    //   }
    // }

    // if (duplicate) {
    //   res.status(500).json({
    //     message: "Category name already in use",
    //   });
    // } else {
    if (req?.file) {
      fs.unlink(deleteImage, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    }
    category.name = name || category.name;
    category.categoryImage = req?.file?.path || category.categoryImage;

    const updatedCategory = await category.save();

    res.status(200).json({
      updatedCategory,
      message: "Category updated",
    });
  }
});

const getSingleCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);

  if (category) {
    res.status(200).json({
      category,
      message: "Category fetched",
    });
  } else {
    res.status(404).json({
      message: "Category not found",
    });
  }
});

const otherCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findById({ _id: categoryId });

  if (category) {
    let current_category_id = category._id;

    const otherCategory = await Category.find({
      _id: { $ne: current_category_id },
    });

    res.status(200).json({
      otherCategory,
      message: "Other category fetched",
    });
  } else {
    res.status(404).json({
      message: "Category not found",
    });
  }
});

export {
  createCategory,
  getCategory,
  searchCategory,
  deleteCategory,
  updateCategory,
  getSingleCategory,
  otherCategory,
};
