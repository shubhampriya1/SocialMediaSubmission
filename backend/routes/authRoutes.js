import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
} from "../controllers/authController.js";
import protect from "../middleware/auth-middleware.js";
const router = express.Router();

// Login route
router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/logout", logoutUser);
router.get("/me", protect, getUserProfile);

export default router;
