import Product from "../models/ProductModel.js";
import asyncHandler from "express-async-handler";

const defaultResponse = (Product) => {
  return {
    _id: Product._id,
    category: Product.category,
    name: Product.name,
    brand: Product.brand,
    seller: Product.seller,
    price: Product.price,
    markPrice: Product.price - (Product.price * Product.discount) / 100,
    description: Product.description,
    countInStock: Product.countInStock,
    averageRating: Product.averageRating,
    totalRatings: Product.totalRatings,
    isVerified: Product.isVerified,
  };
};

const query = [
  {
    path: "category",
    select: "_id name",
  },
  {
    path: "subCategory",
    select: "_id name",
  },
  {
    path: "seller",
    select: "_id fullName",
  },
];

const createProduct = asyncHandler(async (req, res) => {
  let imageArray = [];

  req.files.forEach((elem) => {
    const image = elem.path;
    imageArray.push(image);
  });

  const {
    category,
    subCategory,
    name,
    brand,
    seller,
    markPrice,
    description,
    discount,
    totalRatings,
    averageRating,
    countInStock,
  } = req.body;

  console.log(req.body);

  const product = new Product({
    category,
    subCategory,
    name,
    brand,
    seller,
    markPrice,
    countInStock,
    price:
      discount && discount > 0
        ? (markPrice - (markPrice * discount) / 100).toFixed()
        : markPrice,
    // : markPrice.toFixed(),

    description,
    discount: discount && discount,
    images: imageArray,

    totalRatings: totalRatings,
    averageRating: averageRating,

    isOffer: discount && discount > 0 && true,
  });

  const createdProduct = await product.save();
  const data = defaultResponse(createdProduct);
  res.status(201).json({
    data: createdProduct,
    // data,
    message: "Product created successfully",
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId).populate(query).lean();

  if (product) {
    // const data = defaultResponse(Product);

    res.status(200).json({
      product,
      message: "Product fetched",
    });
  } else {
    res.status(404).json({
      message: "Product not found",
    });
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  const product = await Product.find().populate(query).lean();
  if (product) {
    // const data = defaultResponse(Product);

    res.status(200).json({
      product,
      message: "Product fetched",
    });
  }
});

const getDiscountProduct = asyncHandler(async (req, res) => {
  const product = await Product.find({ isOffer: true }).populate(query).lean();
  if (product) {
    // const data = defaultResponse(Product);

    res.status(200).json({
      product,
      message: "Product fetched",
    });
  }
});
const updateProduct = asyncHandler(async (req, res) => {
  const productId = req.params.productId;
  const { name, isVerified, description, countInStock } = req.body;
  const product = await Product.findById({ _id: productId }).populate(query);
  // .lean();

  if (product) {
    // const data = defaultResponse(Product);
    product.name = name || product.name;
    product.isVerified = isVerified || product.isVerified;
    product.description = description || product.description;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();

    res.status(200).json({
      updatedProduct,
      message: "Product updated",
    });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (product) {
    await product.remove();
    res.status(200).json({
      message: "Product deleted",
    });
  } else {
    res.status(404).json({
      message: "Product not found",
    });
  }
});

export {
  createProduct,
  getProduct,
  getAllProduct,
  getDiscountProduct,
  updateProduct,
  deleteProduct,
};
