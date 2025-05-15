import express from "express";
import {
  createPage,
  getPageById,
  updatePage,
  deletePage,
} from "../controllers/page.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, createPage);
router.get("/:id", verifyJWT, getPageById);
router.put("/:id", verifyJWT, updatePage);
router.delete("/:id", verifyJWT, deletePage);

export default router;
 