import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: [30, "First name cannot be more than 30 characters"],
      minLength: [3, "First name should contain at least 3 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: [30, "Last name cannot be more than 30 characters"],
      minLength: [3, "Last name should contain at least 3 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      minLength: [10, "Phone number should at least be 10 digits"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password should be 8 characters or longer"],
    },
    isAdmin: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    isSeller: { type: Boolean, default: false },
    profileImage: {
      type: String,
      default: `uploads\\profile\\default.png`,
    },
    isAccountVerified: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
