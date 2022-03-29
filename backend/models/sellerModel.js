import mongoose from "mongoose";
const sellerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      maxLength: [50, "Seller name cannot be more than 50 characters"],
      minLength: [3, "Seller name should contain at least 3 characters"],
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
    profileImage: {
      type: String,
      default: "uploads\\profile\\default.png",
    },
  },
  {
    timestamps: true,
  }
);

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;
