import express from "express";
import upload from "../config/fileUploadconfig.js"; // Multer file upload config
import { submitUser, getAllUsers } from "../controllers/userController.js";

const router = express.Router();

// Route to submit user data (name, handle, and images)
router.post("/submit", upload.array("images"), submitUser);

// Route to get all user data (for admin dashboard)
router.get("/dashboard", getAllUsers);


export default router;
