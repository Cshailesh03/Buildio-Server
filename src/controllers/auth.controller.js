import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { google } from "googleapis";
import crypto from "crypto";
import { comparePassword } from "../services/auth.service.js"; // Correct import
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { OAuth2Client } from "google-auth-library";
import nodemailer from "nodemailer";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../config/jwt.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Nodemailer Transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "anandsinghtomar25@gmail.com",
    pass: process.env.EMAIL_PASS || "rvqb tioa clrq yknl",
  },
});

// @desc Signup
export const signup = asyncHandler(async (req, res) => {
  const { username, email, fullname, password } = req.body;

  if (!username || !email || !fullname || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new ApiError(409, "User with this email or username already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, fullname, passwordHash });

  return res
    .status(201)
    .json(new ApiResponse(201, user, "User registered successfully"));
});

// @desc Login
export const login = asyncHandler(async (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password) {
    throw new ApiError(400, "Email/Username and password are required");
  }

  // Find user by email or username
  const user = await User.findOne({
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
  }).select("+passwordHash"); // Make sure passwordHash is included in the response

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }


  const isMatch = await comparePassword(password, user.passwordHash); 
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const userPayload = {
    _id: user._id, 
    email: user.email,
    username: user.username,
  };


  const accessToken = generateAccessToken(userPayload); 
  const refreshToken = generateRefreshToken(userPayload); 

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
  });

  // Return response with access token
  return res.status(200).json(new ApiResponse(200, { accessToken }, "Login successful"));
});

// @desc Logout
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json(new ApiResponse(200, null, "Logout successful"));
});

// @desc Refresh Token
export const refreshToken = asyncHandler(async (req, res) => {
const token = req.cookies.refreshToken;

if (!token) {
throw new ApiError(401, "Refresh token not found");
}
const payload = verifyRefreshToken(token);

const user = await User.findById(payload._id);
if (!user) {
throw new ApiError(401, "User not found");
}

const accessToken = generateAccessToken({
_id: user._id.toString(),
email: user.email,
role: user.role,
});

return res
.status(200)
.json(new ApiResponse(200, { accessToken }, "Token refreshed"));
});

// @desc Forgot Password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) throw new ApiError(400, "Email is required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetHash = crypto.createHash("sha256").update(resetToken).digest("hex");

  user.resetPasswordToken = resetHash;
  user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 5); // 5 min expiry
  await user.save({ validateBeforeSave: false });

  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click the link below:\n\n${resetLink}\n\nThis link expires in 5 minutes.`,
  };

  await transporter.sendMail(mailOptions);

  if (process.env.NODE_ENV !== "production") {
    console.log("Reset link:", resetLink); // helpful for testing
  }

  return res.status(200).json(new ApiResponse(200, null, "Reset password email sent"));
});

// @desc Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) throw new ApiError(400, "Reset token is required");
  if (!password || password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters long");
  }

  const resetHash = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetHash,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) throw new ApiError(400, "Invalid or expired reset token");

  user.passwordHash = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return res.status(200).json(new ApiResponse(200, null, "Password reset successful"));
});

// // @desc Redirect to Google Login
// export const googleAuthURL = asyncHandler(async (req, res) => {
//   const url = client.generateAuthUrl({  // Changed oauth2Client to client
//     access_type: "offline",
//     scope: ["profile", "email"],
//   });
//   res.redirect(url);
// });

// // @desc Google OAuth Callback
// export const googleOAuthCallback = asyncHandler(async (req, res) => {
//   const { code } = req.query;

//   const { tokens } = await client.getToken(code);  // Changed oauth2Client to client
//   client.setCredentials(tokens);  // Changed oauth2Client to client

//   const oauth2 = google.oauth2({
//     auth: client,  // Changed oauth2Client to client
//     version: "v2",
//   });

//   const { data } = await oauth2.userinfo.get();

//   let user = await User.findOne({ email: data.email });
//   if (!user) {
//     user = await User.create({
//       email: data.email,
//       fullname: data.name,
//       username: data.email.split("@")[0],
//       passwordHash: "", // not needed
//       isOAuth: true,
//     });
//   }

//   const payload = {
//     _id: user._id,
//     email: user.email,
//     username: user.username,
//   };

//   const accessToken = generateAccessToken(payload);
//   const refreshToken = generateRefreshToken(payload);

//   res.cookie("refreshToken", refreshToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "Strict",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//   });

//   // For local testing redirect to frontend with token (if needed)
//   return res
//     .status(200)
//     .json(new ApiResponse(200, { accessToken }, "Google OAuth login successful"));
// });
