import { Router } from "express";
import { authenticate } from "../../middleware/auth";
import {
  createStripeIntentHandler,
  listPaymentProvidersHandler,
  stripeWebhookHandler
} from "../../controllers/payment.controller";

const router = Router();

router.get("/providers", authenticate, listPaymentProvidersHandler);
router.post("/intent", authenticate, createStripeIntentHandler);
router.post("/webhook", stripeWebhookHandler);

export default router;
