import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

// JWT secrets and expiration times
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "yourAccessSecret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "yourRefreshSecret";

const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN || "15m";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";

// Generate Access Token
export const generateAccessToken = (payload = {}) => {
  try {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
  } catch (error) {
    console.error('Error generating access token:', error);
    throw new ApiError(500, "Failed to generate access token");
  }
};

// Generate Refresh Token
export const generateRefreshToken = (payload = {}) => {
  try {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });
  } catch (error) {
    console.error('Error generating refresh token:', error);
    throw new ApiError(500, "Failed to generate refresh token");
  }
};

// Verify Access Token
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET);
  } catch (error) {
    console.error('Error verifying access token:', error);
    throw new ApiError(401, "Invalid or expired access token");
  }
};

// Verify Refresh Token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    console.error('Error verifying refresh token:', error);
    throw new ApiError(401, "Invalid or expired refresh token");
  }
};
