import { Router } from "express";
import { allProducts, createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController";
import { verifyTokenAndAdmin } from "../middleware/authMiddleware";


const router = Router();

router.post("/", verifyTokenAndAdmin, createProduct) // In this case only admin can create Product
router.put("/:id", verifyTokenAndAdmin, updateProduct) // In this case only admin can update the Product
router.delete("/:id", verifyTokenAndAdmin, deleteProduct) // In this case only admin can delete the Products
router.get("/find/:id", getProducts) // users and admin can reach this data ; Everybody can see products 
router.get("/", allProducts) // users and admin can reach this data ; Everybody can see products 

export default router;