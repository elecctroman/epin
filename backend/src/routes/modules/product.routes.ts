import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  listProductsHandler,
  updateProductHandler
} from "../../controllers/product.controller";

const router = Router();

router.get("/", listProductsHandler);
router.get("/:id", getProductHandler);
router.post("/", authenticate, authorize(["ADMIN"]), createProductHandler);
router.patch("/:id", authenticate, authorize(["ADMIN"]), updateProductHandler);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteProductHandler);

export default router;
