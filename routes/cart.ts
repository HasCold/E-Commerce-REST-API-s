import { Router } from "express";
import { allCart, createCart, deleteCart, getUserCart, updateCart } from "../controllers/cartController";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/authMiddleware";


const router = Router();

router.post("/", verifyToken, createCart);
router.put("/:id", verifyTokenAndAuthorization, updateCart);
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart); // The id will be the user's id
router.get("/", verifyTokenAndAdmin, allCart);

export default router;