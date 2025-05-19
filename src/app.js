import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import templateRoutes from './routes/template.routes.js';
import './config/passport.js';
import mediaRoutes from './routes/media.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import pageRoutes from './routes/page.routes.js';
import authRoutes from './routes/auth.routes.js';

import userRoutes from "./routes/user.routes.js";
import siteRoutes from "./routes/site.routes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'supersecret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, origin); // Reflect the request origin (even http://localhost:3000, etc.)
    },
    credentials: true, // Allow cookies and credentials
  })
);


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/templates', templateRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sites", siteRoutes);
app.use('/api/pages', pageRoutes);

// Global error handler
app.use(errorMiddleware);

export { app };
