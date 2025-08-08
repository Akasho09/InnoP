import { Router } from "express";
import * as controller from "../controllers/product.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { permit } from "../middlewares/role.middleware";

const router = Router();

router.get("/", controller.listProducts);
router.get("/:id", controller.getProduct);
router.post("/", authenticate, permit("ADMIN"), controller.createProduct);
router.put("/:id", authenticate, permit("ADMIN"), controller.updateProduct);
router.delete("/:id", authenticate, permit("ADMIN"), controller.deleteProduct);

export default router;
