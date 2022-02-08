import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./configs/database.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import path from "path";
import createUploadFolder from "./configs/upload.js";

dotenv.config();
connectDatabase();
createUploadFolder();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Database configured" });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
