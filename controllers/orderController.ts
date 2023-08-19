import { Request, Response } from "express";
import { Order } from "../models/orderModel";


// CREATE CART 
export const createOrder = async (req: Request, res: Response) => {
    const newOrder = new Order(req.body); //  new keyword is creating a new instance of the Cart class based on the data provided in the req.body object. 

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
};

// UPDATE CART
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const updateTheOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
        {new: true}
    );
        
    res.status(200).json(updateTheOrder);
        } catch (error) {
            res.status(500).json(error);
    }
}

// DELETE
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
};

// GET USER ORDERS
export const getUserOrder = async (req: Request, res: Response) => {
    try {
        const order = await Order.find({userId: req.params.userId});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
};

// GET ALL ORDERS 

export const allOrder = async (req: Request, res: Response) => {
 try {
    const orders = await Order.find();
    res.status(200).json(orders);
} catch (error) {
    res.status(500).json(error);
 }   
};

// GET MONTHLY INCOME 

export const monthlyIncome = async (req: Request, res: Response) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1)); 

    try {
        const income = await Order.aggregate([
           {$match: {createdAt: {$gte: previousMonth}}},
            {
                $project: {
                    month: {$month: "$createdAt"},
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: {$sum: "$sales"},
                }
            }
        ]);

        res.status(200).json(income);
    } catch (error) {
        res.status(500).json(error);
    }
};