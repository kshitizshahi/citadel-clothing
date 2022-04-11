import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";
import Product from "../models/ProductModel.js";

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
      paymentResult: isPaid ? paymentResult : null,
    });

    const createdOrder = await order.save();
    order.orderItems.forEach(async (elem) => {
      const product = await Product.findById(elem.productId);

      if (product) {
        product.countInStock = product.countInStock - elem.quantity;

        await product.save();
      }
    });

    res.status(201).json({
      createdOrder,
      message: "Order placed",
    });
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  const order = await Order.find();
  if (order) {
    res.status(200).json({
      order,
      message: "Order fetched",
    });
  }
});

const getUserOrders = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.user }).sort({ createdAt: -1 });
  if (order) {
    res.status(200).json({
      order,
      message: "Order fetched",
    });
  }
});

const getOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

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

export { placeOrder, getAllOrders, getOrder, cancelOrder, getUserOrders };
