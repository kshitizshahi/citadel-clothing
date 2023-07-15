import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../configs/generateToken.js";

import fs from "fs";
import { sendMail } from "../utils/emailSender.js";
import jwt from "jsonwebtoken";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import Category from "../models/categoryModel.js";
import { sendEmail } from "../utils/accountVerifiedEmailSender.js";
import { sendForgotPasswordMail } from "../utils/forgotPasswordEmail.js";

const defaultResponse = (user) => {
  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    profileImage: user.profileImage,
    isAdmin: user.isAdmin,
    isSeller: user.isSeller,
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
    isSeller,
    isAccountVerified,
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
      isSeller: isSeller,
      isAccountVerified: isAccountVerified
        ? isAccountVerified
        : isSeller
        ? false
        : true,
    });
    const createdUser = await user.save();

    sendMail({
      email: user.email,
      path: req.headers.host,
      user: user,
    });

    const data = defaultResponse(createdUser);
    res.status(201).json({
      data,
      message: "Registered. Please verify your email",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      if (!user.isEmailVerified) {
        res.status(401).json({
          message: "Please verify your email",
        });
      }
      if (!user.isAccountVerified) {
        res.status(401).json({
          message: "Account is being verified by admin",
        });
      }

      const data = defaultResponse(user);
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 60 * 15 * 1000,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "none",
        // secure: false,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 2 * 1000,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "none",
        // secure: false,
      });

      res.status(200).json({
        data,
        message: "User logged in",
      });
      return;
    }
  }
  res.status(401).json({ message: "Invalid email or password" });
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });

  if (user) {
    sendForgotPasswordMail({
      user,
      path: req.headers.host,
    });

    res.status(200).json({
      message: "Password reset email sent",
    });
  } else {
    res.status(401).json({ message: "Invalid email" });
  }
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
    const current_email = user.email;

    const otherUser = await User.find({
      email: { $ne: current_email },
    });
    let duplicate = false;

    for (let i = 0; i < otherUser.length; i++) {
      if (otherUser[i].email === email) {
        duplicate = true;
        break;
      }
    }

    if (duplicate) {
      if (req?.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            return console.error(err);
          }
        });
      }

      res.status(500).json({
        message: "Email already in use",
      });
    }

    if (newPassword || confirmNewPassword || oldPassword) {
      if (newPassword !== confirmNewPassword) {
        res.status(400).json({ message: "Password does not match" });
      } else if (!newPassword || !confirmNewPassword) {
        res.status(400).json({ message: "Please enter new password" });
      } else {
        if (bcrypt.compareSync(oldPassword, user.password)) {
          user.password = bcrypt.hashSync(newPassword, 8);
          await user.save();
          res.status(201).json({
            message: "Password Changed",
          });
        } else {
          res.status(400).json({ message: "Old Password does not match" });
        }
      }
    }

    if (req?.file && !duplicate) {
      if (deleteImage !== "uploads\\profile\\default.png") {
        fs.unlink(deleteImage, (err) => {
          if (err) {
            return console.error(err);
          }
        });
      }
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

const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword, confirmNewPassword } = req.body;

  if (newPassword || confirmNewPassword) {
    if (newPassword !== confirmNewPassword) {
      res.status(400).json({ message: "Password does not match" });
    } else {
      jwt.verify(token, process.env.EMAIL_SECRET, async (err, decode) => {
        if (err) {
          res.status(400).json({
            message: "Invalid token",
          });
        } else {
          const user = await User.findById({ _id: decode.userId });
          if (user) {
            user.password = bcrypt.hashSync(newPassword, 8);
            await user.save();
            res.status(200).json({
              message: "Password reset successfull",
            });
          }
        }
      });
    }
  }
});

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

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({
    isAdmin: false,
  }).select("-createdAt -updatedAt -password");
  if (users) {
    res.status(200).json({
      users,
      message: "User fetched",
    });
  }
});

const searchAllUsers = asyncHandler(async (req, res) => {
  const { keywords } = req.params;
  const users = await User.find({
    firstName: { $regex: keywords, $options: "i" },
  });

  if (users) {
    res.status(200).json({
      users,
      message: "Users found",
    });
  } else {
    res.status(404).json({
      message: "Users not found",
    });
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (user) {
    if (user.profileImage !== "uploads\\profile\\default.png") {
      fs.unlink(user.profileImage, (err) => {
        if (err) {
          return console.error(err);
        }
      });
    }
    await User.deleteOne({ _id: userId });
    res.status(200).json({
      message: "User deleted",
    });
  } else {
    res.status(404).json({
      message: "User not found",
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

const getUserInfo = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).select(
    "-createdAt -updatedAt -password"
  );

  if (user) {
    res.status(200).json({
      user,
      message: "User fetched",
    });
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
});

const getOtherUsersEmail = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const users = await User.findById({ _id: userId });

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

const updateUserAdmin = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    oldPassword,
    newPassword,
    confirmNewPassword,
    isAccountVerified,
  } = req.body;

  const deleteImage = user.profileImage;

  if (user) {
    if (newPassword || confirmNewPassword || oldPassword) {
      if (newPassword !== confirmNewPassword) {
        res.status(400).json({ message: "Password does not match" });
      } else if (!newPassword || !confirmNewPassword) {
        res.status(400).json({ message: "Please enter new password" });
      } else {
        if (bcrypt.compareSync(oldPassword, user.password)) {
          user.password = bcrypt.hashSync(newPassword, 8);
        } else {
          res.status(400).json({ message: "Old Password does not match" });
        }
      }
    }

    if (req?.file) {
      if (deleteImage !== "uploads\\profile\\default.png") {
        fs.unlink(deleteImage, (err) => {
          if (err) {
            return console.error(err);
          }
        });
      }
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.profileImage = req.file ? req.file.path : user.profileImage;
    user.isAccountVerified = isAccountVerified;

    const updatedProfile = await user.save();
    const data = defaultResponse(updatedProfile);

    if (isAccountVerified && user.isSeller) {
      sendEmail({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
      });
    }

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

const emailTokenVerify = asyncHandler(async (req, res) => {
  const { token } = req.params;
  let payload;

  try {
    jwt.verify(
      token,
      process.env.EMAIL_SECRET,

      async (err, decode) => {
        if (err) {
          payload = jwt.verify(token, process.env.EMAIL_SECRET, {
            ignoreExpiration: true,
          });
          await User.deleteOne({ _id: payload.userId });
          res.redirect(
            `${process.env.ORIGIN}/register?error=${encodeURIComponent(
              "Link expired. Register again"
            )}`
          );
        } else {
          const user = await User.findById({ _id: decode.userId });

          if (user) {
            user.isEmailVerified = true;
            await user.save();
            res.redirect(
              `${process.env.ORIGIN}/login?success=${encodeURIComponent(
                "Email Verified. Please Login"
              )}`
            );
          }
        }
      }
    );
  } catch (e) {
    console.log("error", e.message);
    await User.deleteOne({ _id: payload.userId });
    res.redirect(
      `${process.env.ORIGIN}/register?error=${encodeURIComponent(
        "Link expired. Register again"
      )}`
    );
  }
});

const forgotPasswordTokenVerify = asyncHandler(async (req, res) => {
  const { token } = req.params;
  try {
    jwt.verify(
      token,
      process.env.EMAIL_SECRET,

      async (err, decode) => {
        if (err) {
          res.redirect(
            `${process.env.ORIGIN}/login?error=${encodeURIComponent(
              "Link expired. Reset password again"
            )}`
          );
        } else {
          res.redirect(
            `${process.env.ORIGIN}/reset-password?success=${encodeURIComponent(
              "Enter new password details"
            )}&&token=${token}`
          );
        }
      }
    );
  } catch (e) {
    console.log("error", e.message);
    await User.deleteOne({ _id: payload.userId });
    res.redirect(
      `${process.env.ORIGIN}/register?error=${encodeURIComponent(
        "Link expired. Register again"
      )}`
    );
  }
});

const dashboardCount = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const totalCustomers = await User.countDocuments({
    isAdmin: false,
    isSeller: false,
  });
  const totalOrders = await Order.countDocuments();
  const totalCategory = await Category.countDocuments();

  res.status(201).json({
    dashboardInfo: {
      totalProducts,
      totalCustomers,
      totalOrders,
      totalCategory,
    },
  });
});

export {
  register,
  login,
  updateUser,
  logout,
  getUser,
  getAllUsers,
  searchAllUsers,
  deleteUser,
  getAllUsersEmail,
  getUserInfo,
  getOtherUsersEmail,
  updateUserAdmin,
  emailTokenVerify,
  dashboardCount,
  forgotPassword,
  forgotPasswordTokenVerify,
  resetPassword,
};
