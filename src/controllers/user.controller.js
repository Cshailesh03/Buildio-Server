import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {ApiError} from "../utils/ApiError.js";
import bcrypt from "bcrypt";

import {User} from "../models/user.model.js";
import {Site} from "../models/site.model.js";
import Page from "../models/page.model.js";
import {Media} from "../models/media.model.js";

// GET /api/user/me
export const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-passwordHash");
  if (!user) throw new ApiError(404, "User not found");
  return res.status(200).json(new ApiResponse(200, user));
});
import { uploadToCloudinary } from "../services/cloudinary.service.js";


// update username and add profile Pic
export const updateProfile = asyncHandler(async (req, res) => {
  const { fullname } = req.body;
  const updateFields = {};

  if (fullname) {
    updateFields.fullname = fullname;
  }

  if (req.file) {
    try {
      const uploadResult = await uploadToCloudinary(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
        "profilePics"
      );
      updateFields.profilePic = uploadResult.secure_url;
      updateFields.profilePicPublicId = uploadResult.public_id;
    } catch (error) {
      throw new ApiError(500, "Failed to upload profile picture");
    }
  }

  if (Object.keys(updateFields).length === 0) {
    throw new ApiError(400, "No valid fields provided for update");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    updateFields,
    { new: true, runValidators: true }
  ).select("-passwordHash");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated"));
});

// PUT /api/user/change-password
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old and new passwords are required");
  }

  const user = await User.findById(req.user._id).select("+passwordHash");
  if (!user) throw new ApiError(404, "User not found");

  const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
  if (!isMatch) throw new ApiError(401, "Incorrect current password");

  const salt = await bcrypt.genSalt(10);
  user.passwordHash = await bcrypt.hash(newPassword, salt);
  await user.save();

  return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"));
});

// GET /api/user/analytics
export const getUserAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [totalSites, totalPages, totalMedia, mediaStats] = await Promise.all([
    Site.countDocuments({ ownerId: userId }),
    Page.countDocuments({ ownerId: userId }),
    Media.countDocuments({ ownerId: userId }),
    Media.aggregate([
      { $match: { ownerId: userId } },
      { $group: { _id: null, totalSize: { $sum: "$size" } } }
    ])
  ]);

  const totalMediaSize = mediaStats[0]?.totalSize || 0;

  return res.status(200).json(new ApiResponse(200, {
    totalSites,
    totalPages,
    totalMedia,
    totalMediaSize
  }));
});

// GET /api/user/recent-media
export const getRecentMedia = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const media = await Media.find({ ownerId: userId })
    .sort({ createdAt: -1 })
    .limit(5);

  return res.status(200).json(new ApiResponse(200, media));
});
