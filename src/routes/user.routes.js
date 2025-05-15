import express from "express";

import {
  getMyProfile,
  updateProfile,
  changePassword,
  getUserAnalytics,
  getRecentMedia
} from "../controllers/user.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/me", verifyJWT, getMyProfile);
router.put("/update", verifyJWT, updateProfile);
router.put("/change-password", verifyJWT, changePassword);
router.get("/analytics", verifyJWT, getUserAnalytics);
router.get("/recent-media", verifyJWT, getRecentMedia);

export default router;
