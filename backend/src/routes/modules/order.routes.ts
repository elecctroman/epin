import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth";
import {
  createOrderHandler,
  finalizeOrderHandler,
  listOrdersHandler,
  updateOrderStatusHandler
} from "../../controllers/order.controller";

const router = Router();

router.get("/", authenticate, authorize(["ADMIN"]), listOrdersHandler);
router.post("/", authenticate, createOrderHandler);
router.post("/:id/finalize", authenticate, finalizeOrderHandler);
router.patch("/:id", authenticate, authorize(["ADMIN"]), updateOrderStatusHandler);

export default router;
