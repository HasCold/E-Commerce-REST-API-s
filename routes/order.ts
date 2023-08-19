import { Router } from "express";
import { allOrder, createOrder, deleteOrder, getUserOrder, monthlyIncome, updateOrder } from "../controllers/orderController";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/authMiddleware";

const router = Router();

router.post("/", verifyToken, createOrder);
router.put("/:id", verifyTokenAndAdmin, updateOrder);
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrder); // The id will be the user's id
router.get("/", verifyTokenAndAdmin, allOrder);
router.get("/income", verifyTokenAndAdmin, monthlyIncome);

export default router;