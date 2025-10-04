import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth";
import {
  banUserHandler,
  listUsersHandler,
  updateUserRoleHandler
} from "../../controllers/user.controller";

const router = Router();

router.get("/", authenticate, authorize(["ADMIN"]), listUsersHandler);
router.patch("/:id/role", authenticate, authorize(["ADMIN"]), updateUserRoleHandler);
router.post("/:id/ban", authenticate, authorize(["ADMIN"]), banUserHandler);

export default router;
