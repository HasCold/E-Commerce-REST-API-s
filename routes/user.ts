import { Router } from "express";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/authMiddleware";
import { deleteUser, getAllUser, getUser, updatedUser, userStats } from "../controllers/userController";

const router = Router();

router.put("/:id", verifyTokenAndAuthorization, updatedUser);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getAllUser);
router.get("/stats", verifyTokenAndAdmin, userStats);  

export default router;
