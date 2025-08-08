import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import * as controller from "../controllers/order.controller";

const router = Router();

router.post("/", authenticate, controller.placeOrder);
router.get("/", authenticate, controller.listOrders);
router.get("/:id", authenticate, controller.getOrder);
router.delete("/:id", authenticate, controller.cancelOrder);

export default router;
