import { Request, Response } from "express";
import {Product} from "../models/productModel"

// CREATE PRODUCT
export const createProduct = async(req: Request, res: Response) => {
    const newProduct = new Product(req.body); // new keyword is creating a new instance of the Product class based on the data provided in the req.body object. 

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);

    } catch (error) {
        res.status(500).json(error);
    }
};

// UPDATE
export const updateProduct = async (req: Request, res: Response) => {
    try {
    const updateTheProduct = await Product.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    },
    {new: true}
    );
    
    res.status(200).json(updateTheProduct);
    } catch (error) {
        res.status(500).json(error);
    }
}; 

// DELETE
export const deleteProduct = async (req: Request, res: Response) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
};

// GET PRODUCTS
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findById(req.params.id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
};

// GET ALL PRODUCTS
export const allProducts = async (req: Request, res: Response) => {
    // localhost:5000/api/products?new=true
    const qNew = req.query.new; // fetch all products by createAtDate

    // localhost:5000/api/products?category=man
    const qCategory = req.query.category; // fetch by category

    try {
        let products;

        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(5);
        }else if(qCategory){
            products = await Product.find({
            categories: {
                $in: [qCategory]
            },
         });
        }else{
            products = await Product.find();
        }

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
} 