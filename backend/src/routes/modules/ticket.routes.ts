import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth";
import {
  createTicketHandler,
  listTicketsHandler,
  updateTicketStatusHandler
} from "../../controllers/ticket.controller";

const router = Router();

router.get("/", authenticate, authorize(["ADMIN"]), listTicketsHandler);
router.post("/", authenticate, createTicketHandler);
router.patch("/:id", authenticate, authorize(["ADMIN"]), updateTicketStatusHandler);

export default router;
