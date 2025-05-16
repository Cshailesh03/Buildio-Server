import express from "express";
import multer from "multer";

import {
  getMyProfile,
  updateProfile,
  changePassword,
  getUserAnalytics,
  getRecentMedia,
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Setup multer storage in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/me", verifyJWT, getMyProfile);

// Use multer middleware to handle single file upload named 'profilePic'
router.put("/update", verifyJWT, upload.single("profilePic"), updateProfile);

router.put("/change-password", verifyJWT, changePassword);
router.get("/analytics", verifyJWT, getUserAnalytics);
router.get("/recent-media", verifyJWT, getRecentMedia);

export default router;

