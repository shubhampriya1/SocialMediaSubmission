import express from "express";
import upload from "../config/fileUploadconfig.js";
import { submitUser, getUserUploads } from "../controllers/userController.js";

const router = express.Router();

router.post("/submit", upload.array("images"), submitUser);
router.get("/dashboard", getUserUploads);

export default router;
