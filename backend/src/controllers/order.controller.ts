import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { createOrderSchema, updateOrderStatusSchema } from "../validators/order.validator";
import { createOrder, finalizeOrder, listOrders, updateOrderStatus } from "../services/order.service";

export async function listOrdersHandler(_req: AuthRequest, res: Response) {
  const orders = await listOrders();
  return res.json(orders);
}

export async function createOrderHandler(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: "Kimlik doğrulaması gerekiyor" });
  }
  const data = createOrderSchema.parse(req.body);
  const { order, clientSecret } = await createOrder(req.user.id, data.productId, data.paymentMethod, data.quantity ?? 1);
  return res.status(201).json({ order, clientSecret });
}

export async function finalizeOrderHandler(req: AuthRequest, res: Response) {
  const order = await finalizeOrder(req.params.id);
  return res.json(order);
}

export async function updateOrderStatusHandler(req: AuthRequest, res: Response) {
  const data = updateOrderStatusSchema.parse(req.body);
  const order = await updateOrderStatus(req.params.id, data.status);
  return res.json(order);
}
