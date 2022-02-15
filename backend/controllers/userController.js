import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../configs/generateToken.js";

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

const changeProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  // const user = await User.findById(req.user._id);

  if (user) {
    user.profileImage = req.file.filename;
    const updatedProfile = await user.save();
    const data = defaultResponse(updatedProfile);

    res.status(200).json({
      // data: {
      //   _id: user._id,
      //   firstName: user.firstName,
      //   lastName: user.lastName,
      //   email: user.email,
      //   phoneNumber: user.phoneNumber,
      //   profileImage: user.profileImage,
      //   isAdmin: user.isAdmin,
      // },
      data,
      message: "User updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const getAuthToken = (req, res) => {
  const accessToken = generateAccessToken(req.user._id);

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

export { register, login, changeProfile, getAuthToken, logout };
