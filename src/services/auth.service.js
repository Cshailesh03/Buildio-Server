import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAccessToken, generateRefreshToken } from "../config/jwt.js"; // Importing from the new jwt.js

// Hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare password with hash
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Create Reset Token (for password reset)
export const createResetToken = (user) => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(resetToken).digest("hex");

  user.resetPasswordToken = hash;
  user.resetPasswordExpires = Date.now() + 1000 * 60 * 5; // 5 minutes
  return { resetToken, user };
};

// Create or Find OAuth User (e.g. Google)
export const createOrFindOAuthUser = async (googleUser) => {
  const { email, name, picture, sub } = googleUser;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      email,
      fullname: name,
      username: email.split("@")[0],
      avatar: picture,
      oauthProvider: "google",
      oauthId: sub,
      passwordHash: null, // For OAuth-only users
    });
  }

  return user;
};
