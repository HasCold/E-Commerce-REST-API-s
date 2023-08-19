import { Request, Response } from "express";
import { Cart } from "../models/cartModel";


// CREATE CART 
export const createCart = async (req: Request, res: Response) => {
    const newCart = new Cart(req.body); //  new keyword is creating a new instance of the Cart class based on the data provided in the req.body object. 

    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (error) {
        res.status(500).json(error);
    }
};

// UPDATE CART
export const updateCart = async (req: Request, res: Response) => {
    try {
        const updateTheCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
        {new: true}
        );
        
        res.status(200).json(updateTheCart);
        } catch (error) {
            res.status(500).json(error);
        }
}

// DELETE
export const deleteCart = async (req: Request, res: Response) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
};

// GET USER CART
export const getUserCart = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
};

// GET ALL 

export const allCart = async (req: Request, res: Response) => {
 try {
    const carts = await Cart.find();
    res.status(200).json(carts);
} catch (error) {
    res.status(500).json(error);
 }   
}