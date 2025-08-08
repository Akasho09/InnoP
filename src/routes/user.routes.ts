import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import * as controller from "../controllers/user.controller";

const router = Router();

router.get("/:id", authenticate, controller.getProfile);
router.put("/:id", authenticate, controller.updateProfile);

export default router;
