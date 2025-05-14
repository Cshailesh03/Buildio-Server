import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(
cors({
origin: process.env.CORS_ORIGIN,
credentials: true,
})
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
}

import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
// import siteRoutes from "./routes/site.routes.js";
// import pageRoutes from "./routes/page.routes.js";


app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/sites", siteRoutes);
// app.use("/api/pages", pageRoutes);


// Global error handler
app.use(errorMiddleware);

export { app };