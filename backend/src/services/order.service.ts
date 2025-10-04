import Stripe from "stripe";
import { prisma } from "../utils/prisma";
import { env } from "../config/env";
import { consumeKey } from "./key.service";

const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" }) : null;

export async function createOrder(userId: string, productId: string, paymentMethod: string, quantity = 1) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    throw new Error("Ürün bulunamadı");
  }

  const amount = Number(product.price) * quantity;

  const order = await prisma.order.create({
    data: {
      userId,
      productId,
      status: "PENDING",
      paymentId: "pending",
      amount,
      quantity
    }
  });

  if (paymentMethod === "stripe" && stripe) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "try",
      metadata: { orderId: order.id, productId }
    });
    await prisma.order.update({ where: { id: order.id }, data: { paymentId: paymentIntent.id } });
    return { order, clientSecret: paymentIntent.client_secret };
  }

  return { order };
}

export async function finalizeOrder(orderId: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Sipariş bulunamadı");
  if (order.status === "PAID") return order;

  const key = await consumeKey(order.productId);
  const updated = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "PAID",
      keyId: key.id
    },
    include: {
      key: true,
      product: true,
      user: true
    }
  });
  return updated;
}

export function listOrders() {
  return prisma.order.findMany({ include: { product: true, key: true, user: true } });
}

export function updateOrderStatus(orderId: string, status: "PENDING" | "PAID" | "FAILED" | "REFUNDED") {
  return prisma.order.update({ where: { id: orderId }, data: { status } });
}
