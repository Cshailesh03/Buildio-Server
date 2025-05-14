
import { ApiError } from "../utils/ApiError.js";

// Centralized error handling middleware
export const errorMiddleware = (err, req, res, next) => {


if (process.env.NODE_ENV === "development") {
console.error("❌ Error Stack:", err.stack);
}


if (err instanceof ApiError) {
return res.status(err.statusCode).json({
success: false,
message: err.message,
errors: err.errors || null,
stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
});
}

// Handle Mongoose validation errors
if (err.name === "ValidationError") {
const errors = Object.values(err.errors).map((e) => ({
field: e.path,
message: e.message,
}));


return res.status(400).json({
  success: false,
  message: "Validation Error",
  errors,
});
}

// Handle Mongoose duplicate key error
if (err.code && err.code === 11000) {
const field = Object.keys(err.keyPattern || err.keyValue || {})[0];

return res.status(409).json({
  success: false,
  message: `Duplicate value for field ${field}`,
});
}

// Fallback for all other errors
return res.status(err.statusCode || 500).json({
success: false,
message: err.message || "Internal Server Error",
stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
});
};