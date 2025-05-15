import express from "express";
import {
  createTemplate,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} from "../controllers/template.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", verifyJWT, createTemplate);
router.get("/:id", verifyJWT, getTemplateById);
router.put("/:id", verifyJWT, updateTemplate);
router.delete("/:id", verifyJWT, deleteTemplate);

export default router;
