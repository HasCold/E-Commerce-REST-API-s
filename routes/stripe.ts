import { Router } from "express";
import { createPayment } from "../controllers/stripeController";

const router = Router();

router.post("/payment", createPayment);

export default router;