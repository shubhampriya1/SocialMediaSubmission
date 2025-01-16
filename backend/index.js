import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connection from "./config/db.js";
import protect from "./middleware/auth-middleware.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static("uploads"));

connection();

app.use("/api", protect, userRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running..." });
});

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
