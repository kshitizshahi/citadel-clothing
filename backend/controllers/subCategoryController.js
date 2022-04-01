import SubCategory from "../models/subCategoryModel.js";
import asyncHandler from "express-async-handler";

const defaultResponse = (subCategory) => {
  return {
    _id: subCategory._id,
    category: subCategory.category,
    name: subCategory.name,
  };
};

const query = [
  {
    path: "category",
    select: "_id name",
  },
];

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

const getSingleSubCategory = asyncHandler(async (req, res) => {
  const { subCategoryId } = req.params;
  const subCategory = await SubCategory.findById(subCategoryId)
    .populate(query)
    .lean();

  if (subCategory) {
    res.status(200).json({
      subCategory,
      message: "Sub Category fetched",
    });
  } else {
    res.status(404).json({
      message: "Sub-category not found",
    });
  }
});

const getSubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.find()
    .select("-createdAt -updatedAt")
    .populate(query)
    .lean();

  if (subCategory) {
    res.status(200).json({
      subCategory,
      message: "Sub Category fetched",
    });
  }
});

const searchSubCategory = asyncHandler(async (req, res) => {
  const { keywords } = req.params;
  const subCategory = await SubCategory.find({
    name: { $regex: keywords, $options: "i" },
  })
    .select("-createdAt -updatedAt")
    .populate(query)
    .lean();

  if (subCategory) {
    res.status(200).json({
      subCategory,
      message: "Sub Category found",
    });
  } else {
    res.status(404).json({
      message: "Sub Category not found",
    });
  }
});

const deleteSubCategory = asyncHandler(async (req, res) => {
  const { subCategoryId } = req.params;

  const subCategory = await SubCategory.findById(subCategoryId);

  if (subCategory) {
    await subCategory.remove();
    res.status(201).json({
      message: "Sub category deleted",
    });
  } else {
    res.status(404).json({
      message: "Sub category not found",
    });
  }
});

const otherSubCategory = asyncHandler(async (req, res) => {
  const { subCategoryId } = req.params;

  const subCategory = await SubCategory.findById({ _id: subCategoryId });

  if (subCategory) {
    let current_subCategory_id = subCategory._id;

    const otherSubCategory = await SubCategory.find({
      _id: { $ne: current_subCategory_id },
    });

    res.status(200).json({
      otherSubCategory,
      message: "Other sub category fetched",
    });
  } else {
    res.status(404).json({
      message: "Sub Category not found",
    });
  }
});

const updateSubCategory = asyncHandler(async (req, res) => {
  const { subCategoryId } = req.params;
  const { name, category } = req.body;

  const subCategory = await SubCategory.findById({ _id: subCategoryId });

  if (subCategory) {
    subCategory.name = name || subCategory.name;
    subCategory.category = category || subCategory.category;

    const updatedSubCategory = await subCategory.save();

    res.status(201).json({
      updatedSubCategory,
      message: "Sub Category updated",
    });
  }
});

const getCategorySubCategory = asyncHandler(async (req, res) => {
  const subCategory = await SubCategory.find({
    category: req.params.categoryId,
  });

  if (subCategory) {
    res.status(200).json({
      data: subCategory,
      message: "Sub Category fetched",
    });
  } else {
    res.status(404).json({
      message: "Sub-category not found",
    });
  }
});

export {
  createSubCategory,
  getSubCategory,
  getSingleSubCategory,
  searchSubCategory,
  deleteSubCategory,
  otherSubCategory,
  updateSubCategory,
  getCategorySubCategory,
};
