import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../configs/generateToken.js";

import fs from "fs";

const defaultResponse = (user) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    profileImage: user.profileImage,
    isAdmin: user.isAdmin,
  };
};

const register = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    isAdmin,
    adminSecret,
  } = req.body;

  const duplicate_email = await User.findOne({ email: email });
  if (password !== confirmPassword) {
    res.status(400).json({ message: "Password not matching" });
  } else if (duplicate_email) {
    res.status(400).json({ message: "Email already in use" });
  } else if (isAdmin && adminSecret === process.env.ADMIN_SECRET) {
    const admin_user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: bcrypt.hashSync(password, 8),
      profileImage: req.file?.path,
      isAdmin,
    });
    const createdUser = await admin_user.save();
    const data = defaultResponse(createdUser);
    res.status(201).json({
      data,
      message: "Admin created successfully",
    });
  } else {
    const user = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: bcrypt.hashSync(password, 8),
      profileImage: req.file?.path,
    });
    const createdUser = await user.save();
    const data = defaultResponse(createdUser);
    res.status(201).json({
      data,
      message: "User created successfully",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const data = defaultResponse(user);
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 60 * 15 * 1000,
        // secure: process.env.NODE_ENV !== "development",
        // sameSite: "none",
        // secure: false,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 2 * 1000,
        // secure: process.env.NODE_ENV !== "development",
        // sameSite: "none",
        // secure: false,
      });

      res.status(200).json({
        data,
        // data: {
        //   accessToken: accessToken,
        //   refreshToken: refreshToken,
        // },
        message: "User logged in",
      });
      return;
    }
  }
  res.status(401).json({ message: "Invalid email or password" });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    oldPassword,
    newPassword,
    confirmNewPassword,
  } = req.body;

  const deleteImage = user.profileImage;

  if (user) {
    if (newPassword || confirmNewPassword || oldPassword) {
      if (newPassword !== confirmNewPassword) {
        res.status(400).json({ message: "Password does not match" });
      } else {
        if (bcrypt.compareSync(oldPassword, user.password)) {
          user.password = bcrypt.hashSync(newPassword, 8);
        } else {
          res.status(400).json({ message: "Old Password does not match" });
        }
      }
    }

    if (req?.file) {
      fs.unlink(deleteImage, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.profileImage = req.file ? req.file.path : user.profileImage;

    const updatedProfile = await user.save();
    const data = defaultResponse(updatedProfile);

    res.status(200).json({
      data,
      message: "User updated successfully",
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

const getAuthToken = (req, res) => {
  const accessToken = generateAccessToken(req.user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 60 * 15 * 1000,
    secure: process.env.NODE_ENV !== "development",

    // sameSite: "none",
    // secure: false,
  });

  res.status(200).json({
    message: "Access token sent",
  });
};

const logout = (req, res) => {
  res.status(202).clearCookie("accessToken");
  res.status(202).clearCookie("refreshToken");

  res.status(202).json({ message: "User logged out" });
};

const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);
  if (user) {
    const data = defaultResponse(user);

    res.status(200).json({
      data,
      isValid: true,
      message: "User fetched",
    });
  }
});

const getAllCustomers = asyncHandler(async (req, res) => {
  const customers = await User.find({
    isAdmin: false,
  }).select("-createdAt -updatedAt -password");
  if (customers) {
    res.status(200).json({
      customers,
      message: "User fetched",
    });
  }
});

const searchCustomers = asyncHandler(async (req, res) => {
  const { keywords } = req.params;
  const customers = await User.find({
    firstName: { $regex: keywords, $options: "i" },
  });

  if (customers) {
    res.status(200).json({
      customers,
      message: "Customers found",
    });
  } else {
    res.status(404).json({
      message: "Customers not found",
    });
  }
});

const deleteCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  const customer = await User.findById(customerId);

  if (customer) {
    fs.unlink(customer.profileImage, (err) => {
      if (err) {
        return console.error(err);
      }
    });
    await customer.remove();
    res.status(200).json({
      message: "Customer deleted",
    });
  } else {
    res.status(404).json({
      message: "Customer not found",
    });
  }
});

const getAllUsersEmail = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("email -_id");
  if (users) {
    res.status(200).json({
      users,
      message: "User fetched",
    });
  }
});

const getCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;
  const customer = await User.findById(customerId).select(
    "-createdAt -updatedAt -password"
  );

  if (customer) {
    res.status(200).json({
      customer,
      message: "Customer fetched",
    });
  } else {
    res.status(404).json({
      message: "Customer not found",
    });
  }
});

const getOtherUsersEmail = asyncHandler(async (req, res) => {
  const { customerId } = req.params;

  const users = await User.findById({ _id: customerId });

  if (users) {
    const otherUsers = await User.find({
      _id: { $ne: users._id },
    }).select("email -_id");

    res.status(200).json({
      otherUsers,
      message: "Other users email fetched",
    });
  } else {
    res.status(404).json({
      message: "Users not found",
    });
  }
});

const updateCustomer = asyncHandler(async (req, res) => {
  const { customerId } = req.params;
  const user = await User.findById(customerId);

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    oldPassword,
    newPassword,
    confirmNewPassword,
  } = req.body;

  const deleteImage = user.profileImage;

  if (user) {
    if (newPassword || confirmNewPassword || oldPassword) {
      if (newPassword !== confirmNewPassword) {
        res.status(400).json({ message: "Password does not match" });
      } else {
        if (bcrypt.compareSync(oldPassword, user.password)) {
          user.password = bcrypt.hashSync(newPassword, 8);
        } else {
          res.status(400).json({ message: "Old Password does not match" });
        }
      }
    }

    if (req?.file) {
      fs.unlink(deleteImage, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.profileImage = req.file ? req.file.path : user.profileImage;

    const updatedProfile = await user.save();
    const data = defaultResponse(updatedProfile);

    res.status(200).json({
      data,
      message: "User updated successfully",
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

const checkOtherUsersEmail = asyncHandler(async (req, res) => {
  const users = await User.findById({ _id: req.user });

  if (users) {
    const otherUsers = await User.find({
      _id: { $ne: users._id },
    }).select("email -_id");

    res.status(200).json({
      otherUsers,
      message: "Other users email fetched",
    });
  } else {
    res.status(404).json({
      message: "Users not found",
    });
  }
});

export {
  register,
  login,
  updateUser,
  getAuthToken,
  logout,
  getUser,
  getAllCustomers,
  searchCustomers,
  deleteCustomer,
  getAllUsersEmail,
  getCustomer,
  getOtherUsersEmail,
  updateCustomer,
  checkOtherUsersEmail,
};
