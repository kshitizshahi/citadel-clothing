import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

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
    sellerSecret,
  } = req.body;

  const duplicate_email = await User.findOne({ email: email });
  if (password !== confirmPassword) {
    res.status(401).json({ message: "Password not matching" });
  } else if (duplicate_email) {
    res.status(401).json({ message: "Email already in use" });
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
    res.json({
      _id: createdUser._id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      phoneNumber: createdUser.phoneNumber,
      isAdmin: createdUser.isAdmin,
      isSeller: createdUser.isSeller,
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
    res.json({
      _id: createdUser._id,
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
      phoneNumber: createdUser.phoneNumber,
      isAdmin: createdUser.isAdmin,
      isSeller: createdUser.isSeller,
    });
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.json({
        _id: user._id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
      });
      return;
    }
  }
  res.status(401).json({ message: "Invalid email or password" });
});

const changeProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (user) {
    user.profileImage = req.file.filename;
    const updatedProfile = await user.save();
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { register, login, changeProfile };
