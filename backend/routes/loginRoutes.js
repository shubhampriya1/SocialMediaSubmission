import express from "express";
import { loginUser } from "../controllers/logincontrller.js";
import { registerUser } from "../controllers/logincontrller.js";
const router = express.Router();

// Login route
router.post("/login", loginUser);
router.post("/register", registerUser);
export default router;
