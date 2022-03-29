import bcrypt from "bcrypt";
import Seller from "../models/SellerModel.js";
import asyncHandler from "express-async-handler";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../configs/generateToken.js";

const defaultResponse = (Seller) => {
  return {
    _id: Seller._id,
    fullName: Seller.fullName,
    email: Seller.email,
    phoneNumber: Seller.phoneNumber,
    profileImage: Seller.profileImage,
  };
};

const register = asyncHandler(async (req, res) => {
  const {
    fullName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    sellerSecret,
  } = req.body;

  const duplicate_email = await Seller.findOne({ email: email });
  if (password !== confirmPassword) {
    res.status(400).json({ message: "Password not matching" });
  } else if (duplicate_email) {
    res.status(400).json({ message: "Email already in use" });
  } else if (sellerSecret === process.env.SELLER_SECRET) {
    const seller = new Seller({
      fullName,
      email,
      phoneNumber,
      password: bcrypt.hashSync(password, 8),
    });
    const createdSeller = await seller.save();
    const data = defaultResponse(createdSeller);
    res.status(201).json({
      data,
      message: "Seller created successfully",
    });
  } else {
    res.status(401).json({
      message: "Seller secret not matching",
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const Seller = await Seller.findOne({ email: email });

  if (Seller) {
    if (bcrypt.compareSync(password, Seller.password)) {
      const data = defaultResponse(Seller);
      const accessToken = generateAccessToken(Seller._id);
      const refreshToken = generateRefreshToken(Seller._id);

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
        message: "Seller logged in",
      });
      return;
    }
  }
  res.status(401).json({ message: "Invalid email or password" });
});

const updateSeller = asyncHandler(async (req, res) => {
  // const Seller = await Seller.findById(req.params.SellerId);
  const Seller = await Seller.findById(req.Seller._id);

  const { firstName, lastName, email, phoneNumber } = req.body;

  if (Seller) {
    Seller.firstName = firstName || Seller.firstName;
    Seller.lastName = lastName || Seller.lastName;
    Seller.email = email || Seller.email;
    Seller.phoneNumber = phoneNumber || Seller.phoneNumber;

    Seller.profileImage = req.file ? req.file.filename : Seller.profileImage;

    const updatedProfile = await Seller.save();
    const data = defaultResponse(updatedProfile);

    res.status(200).json({
      // data: {
      //   _id: Seller._id,
      //   firstName: Seller.firstName,
      //   lastName: Seller.lastName,
      //   email: Seller.email,
      //   phoneNumber: Seller.phoneNumber,
      //   profileImage: Seller.profileImage,
      //   isAdmin: Seller.isAdmin,
      // },
      data,
      message: "Seller updated successfully",
    });
  } else {
    res.status(404);
    throw new Error("Seller not found");
  }
});

const getAuthToken = (req, res) => {
  const accessToken = generateAccessToken(req.Seller._id);

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

  res.status(202).json({ message: "Seller logged out" });
};

const getSeller = asyncHandler(async (req, res) => {
  const seller = await Seller.find().select("-createdAt -updatedAt -password");

  if (seller) {
    res.status(200).json({
      data: seller,
      message: "Seller fetched",
    });
  }
});

export { register, login, updateSeller, getAuthToken, logout, getSeller };
