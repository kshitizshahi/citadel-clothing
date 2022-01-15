import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./configs/database.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";

dotenv.config();
connectDatabase();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoute);

app.get('/', (req, res) => {
    res.status(200).json({message: "Database configured"});
})


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})