import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth";
import {
  bulkUploadHandler,
  createKeyHandler,
  csvUploadMiddleware,
  deleteKeyHandler,
  listKeysHandler
} from "../../controllers/key.controller";

const router = Router({ mergeParams: true });

router.get("/:productId", authenticate, authorize(["ADMIN"]), listKeysHandler);
router.post("/", authenticate, authorize(["ADMIN"]), createKeyHandler);
router.post("/bulk", authenticate, authorize(["ADMIN"]), csvUploadMiddleware, bulkUploadHandler);
router.delete("/:id", authenticate, authorize(["ADMIN"]), deleteKeyHandler);

export default router;
