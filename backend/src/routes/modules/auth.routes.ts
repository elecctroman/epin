import { Router } from "express";
import { authenticate } from "../../middleware/auth";
import {
  createApiTokenHandler,
  loginHandler,
  meHandler,
  registerHandler,
  updatePasswordHandler
} from "../../controllers/auth.controller";

const router = Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/me", authenticate, meHandler);
router.post("/password", authenticate, updatePasswordHandler);
router.post("/tokens", authenticate, createApiTokenHandler);

export default router;
