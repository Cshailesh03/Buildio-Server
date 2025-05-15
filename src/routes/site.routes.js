import express from "express";
import {
  createSite,
  getUserSites,
  getSiteById,
  updateSite,
  deleteSite,
} from "../controllers/site.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(verifyJWT);

router.post("/", createSite);
router.get("/", getUserSites);
router.get("/:id", getSiteById);
router.put("/:id", updateSite);
router.delete("/:id", deleteSite);

export default router;
