import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import { generateAccessToken } from "../configs/generateToken.js";

export const isAuth = (req, res, next) => {
  const token = req.cookies.accessToken;

  try {
    if (token) {
      const decode = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decode) => {
          if (err) {
            res.status(403).json({ error: "Invalid token" });
          } else {
            return decode;
          }
        }
      );
      req.user = decode.id;
      next();
    } else if (req.accessToken) {
      next();
    } else {
      res.status(401).json({ error: "Not authorized, please login" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const admin = asyncHandler(async (req, res, next) => {
  const data = await User.findById(req.user).select("-password");

  if (req.user && data.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: "Not authorized as an admin" });
  }
});

export const verifyAccessTokenExpiry = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken;
  const refToken = req.cookies.refreshToken;

  try {
    if (refToken && !token) {
      const decoded = jwt.verify(
        refToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decode) => {
          if (err) {
            res.status(403).json({ error: "Invalid refresh token" });
          } else {
            return decode;
          }
        }
      );
      const accessToken = generateAccessToken(decoded.id);
      req.user = decoded.id;
      // req.user = await User.findById(decoded.id).select("-password");

      req.accessToken = accessToken;

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 60 * 15 * 1000,
        secure: process.env.NODE_ENV !== "development",
        // sameSite: "none",
        // secure: false,
      });
      next();
    } else if (token && refToken) {
      jwt.verify(refToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
        if (err) {
          res.status(403).json({ message: "Invalid refresh token" });
        }
      });
      next();
    } else if (token && !refToken) {
      next();
    } else {
      res.status(401).json({ error: "Not authorized, please login" });
    }
  } catch (error) {
    console.log(error);
  }
});
