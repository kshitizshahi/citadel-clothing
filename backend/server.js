import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./configs/database.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import path from "path";
import createUploadFolder from "./configs/upload.js";
import cookieParser from "cookie-parser";

dotenv.config();
connectDatabase();
createUploadFolder();

const app = express();

// app.use(cors());

app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/users", userRoute);
app.use("/api/sellers", sellerRoute);
app.use("/api/category", categoryRoute);
app.use("/api/product", productRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Database configured" });
});

//error handler
app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
