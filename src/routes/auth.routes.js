import express from "express";
import passport from "passport";
import {
signup,
login,
logout,
forgotPassword,
resetPassword,
refreshToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
    session: false,
  }),
  (req, res) => {
    const user = req.user;
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?user=${encodeURIComponent(user.email)}`);
  }
);



export default router; 