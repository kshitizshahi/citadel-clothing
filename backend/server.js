import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./configs/database.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import subCategoryRoute from "./routes/subCategoryRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import orderRoute from "./routes/orderRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import contactRoute from "./routes/contactRoute.js";

import path from "path";
import createUploadFolder from "./configs/upload.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDatabase();
createUploadFolder();

const app = express();

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/sub-category", subCategoryRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/contact-us", contactRoute);
app.use("/api/payment", paymentRoute);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
// app.use("/uploads", express.static(path.join(__dirname, "/tmp/uploads"))); //serverless

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "./frontend/build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Database configured" });
  });
}

//error handler
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
