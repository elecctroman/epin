import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth";
import Stripe from "stripe";
import { env } from "../config/env";
import { logger } from "../config/logger";
import { finalizeOrder } from "../services/order.service";


export function listPaymentProvidersHandler(_req: AuthRequest, res: Response) {
  return res.json({ providers: ["stripe", "iyzico", "paytr", "shopier"] });
}

export async function createStripeIntentHandler(req: AuthRequest, res: Response) {
  if (!stripe) {
    return res.status(400).json({ message: "Stripe yapılandırılmadı" });
  }
  if (!req.user) {
    return res.status(401).json({ message: "Kimlik doğrulaması gerekiyor" });
  }
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({ message: "Tutar gereklidir" });
  }
  const intent = await stripe.paymentIntents.create({
    amount: Math.round(Number(amount) * 100),
    currency: "try",
    metadata: { userId: req.user.id }
  });
  return res.status(201).json({ clientSecret: intent.client_secret });
}

const stripe = env.STRIPE_SECRET_KEY ? new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" }) : null;

export async function stripeWebhookHandler(req: Request, res: Response) {
  if (!stripe || !env.STRIPE_WEBHOOK_SECRET) {
    return res.status(400).send("Stripe yapılandırılmadı");
  }

  const sig = req.headers["stripe-signature"];

  let event: Stripe.Event;

  try {
    const payload = req.body instanceof Buffer ? req.body : Buffer.from(JSON.stringify(req.body));
    event = stripe.webhooks.constructEvent(payload, sig as string, env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    logger.error(err);
    return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const orderId = paymentIntent.metadata?.orderId;
    if (orderId) {
      await finalizeOrder(orderId);
    }
  }

  res.json({ received: true });
}
