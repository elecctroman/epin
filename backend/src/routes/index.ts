import { Router } from "express";
import authRoutes from "./modules/auth.routes";
import productRoutes from "./modules/product.routes";
import keyRoutes from "./modules/key.routes";
import orderRoutes from "./modules/order.routes";
import ticketRoutes from "./modules/ticket.routes";
import userRoutes from "./modules/user.routes";
import notificationRoutes from "./modules/notification.routes";
import paymentRoutes from "./modules/payment.routes";

export const router = Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/keys", keyRoutes);
router.use("/orders", orderRoutes);
router.use("/tickets", ticketRoutes);
router.use("/users", userRoutes);
router.use("/notifications", notificationRoutes);
router.use("/payment", paymentRoutes);
