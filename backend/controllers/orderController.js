import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";
import User from "../models/userModel.js";

import { sendMail } from "../utils/orderPlacedEmailSender.js";

const query = [
  {
    path: "user",
    select: "_id firstName lastName email",
  },
];

const placeOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    totalPrice,
    isPaid,
    paymentResult,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({
      message: "Cart is empty",
    });
  } else {
    const order = new Order({
      user: req.user,
      orderItems,
      shippingAddress,
      paymentMethod,
      shippingPrice,
      totalPrice,
      isPaid,
      paymentResult: isPaid
        ? {
            id: paymentResult.id,
            token: paymentResult.token,
            isVerified: paymentResult.isVerified,
            paidAt: new Date(paymentResult.paidOn),
          }
        : null,
    });

    const createdOrder = await order.save();
    order.orderItems.forEach(async (elem) => {
      const product = await Product.findById(elem.productId);

      if (product) {
        product.countInStock = product.countInStock - elem.quantity;
        await product.save();
      }
    });

    const user = await User.findById(req.user);

    const shippingDetails = createdOrder.shippingAddress;

    sendMail({
      order: createdOrder,
      name: `${user.firstName} ${user.lastName}`,
      user,
      shippingAddress: `${shippingDetails.address}, ${shippingDetails.city} ${shippingDetails.postalCode} ${shippingDetails.country}`,
    });

    res.status(201).json({
      createdOrder,
      message: "Order placed",
    });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  const ordersPerPage = 8;
  const currentPage = Number(req.query.pageNumber) || 1;
  const totalOrders = await Order.countDocuments();

  const order = await Order.find()
    .limit(ordersPerPage)
    .skip(ordersPerPage * (currentPage - 1))
    .populate(query);
  if (order) {
    res.status(200).json({
      order,
      currentPage,
      totalOrders,
      totalPages: Math.ceil(totalOrders / ordersPerPage),
      message: "Order fetched",
    });
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  const ordersPerPage = 3;
  const currentPage = Number(req.query.pageNumber) || 1;
  const totalOrders = await Order.countDocuments({ user: req.user });

  const order = await Order.find({ user: req.user })
    .limit(ordersPerPage)
    .skip(ordersPerPage * (currentPage - 1))
    .sort({ createdAt: -1 });
  if (order) {
    res.status(200).json({
      order,
      currentPage,
      totalOrders,
      totalPages: Math.ceil(totalOrders / ordersPerPage),
      message: "Order fetched",
    });
  }
});

const getOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId).populate(query);

  if (order) {
    // const data = defaultResponse(Order);

    res.status(200).json({
      order,
      message: "Order fetched",
    });
  } else {
    res.status(404).json({
      message: "Order not found",
    });
  }
});

const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (order) {
    order.isCancelled = true;
    await order.save();

    order.orderItems.forEach(async (elem) => {
      const product = await Product.findById(elem.productId);

      if (product) {
        product.countInStock = product.countInStock + elem.quantity;

        await product.save();
      }
    });

    res.status(200).json({
      message: "Order cancelled",
    });
  } else {
    res.status(404).json({
      message: "Order not found",
    });
  }
});

const searchOrder = asyncHandler(async (req, res) => {
  const { keywords } = req.params;

  const order = await Order.find({
    paymentMethod: { $regex: keywords, $options: "i" },
  })
    .populate(query)
    .lean();

  if (order) {
    res.status(200).json({
      order,
      message: "Order found",
    });
  } else {
    res.status(404).json({
      message: "Order not found",
    });
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json({
      message: "Order updated",
    });
  } else {
    res.status(404).json({
      message: "Order not found",
    });
  }
});

export {
  placeOrder,
  getAllOrders,
  getOrder,
  cancelOrder,
  getUserOrders,
  searchOrder,
  updateOrderToDelivered,
};
