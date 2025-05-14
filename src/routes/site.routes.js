import express from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
createSite,
getMySites,
} from "../controllers/site.controller.js";

const router = express.Router();

router.use(verifyJWT); // Protect all below routes
router.post("/", authorizeRoles("creator", "admin"), createSite);
router.get("/", getMySites);

export default router;