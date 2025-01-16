import express from "express";
import cors from "cors";
import path from "path";
import connection from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"; // User routes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "uploads"))); // Serve uploaded files

// Connect to MongoDB
connection();

// API Routes
app.use("/api", userRoutes);
app.get("/", (req, res) => {
  res.send("sever is ready");
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
