import { Request, Response } from "express";
import { userTypes } from "../types/backendTypes";
const User = require ("../models/userModel");
const CryptoJS = require("crypto-js");

declare global {
    namespace Express {
        interface Request {
            user: userTypes
        }
    }
}

// Updated User
export const updatedUser = async (req: Request, res: Response) => {
    if(req.body.password ){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    try {
        const updatetheUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },
        {new: true}
    );
    res.status(200).json(updatetheUser);
    } catch (error) {
        res.status(500).json(error);
    }
};

// DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...")

    } catch (error) {
        res.status(500).json(error);
    }
}

// GET USER

export const getUser = async (req: Request, res: Response) => {
try {
    const user = await User.findById(req.params.id);

    const {password, ...others} = user._doc;
    res.status(200).json(others);

} catch (error) {
    res.status(500).json(error);
}
}

// GET ALL USER

export const getAllUser = async (req: Request, res: Response) => {
    const query = req.query.new;  // localhost:5000/api/users?new=true
    
    try {
        const users = query ? await User.find().
        sort({_id: -1}). // sorting by _id in descending order (-1) will result in the most recently created documents appearing first.
        limit(5) : await User.find();
    
        res.status(200).json(users);
    
    } catch (error) {
        res.status(500).json(error);
    }
}

// GET USER STATS ; Return the total number of users per month

export const userStats = async (req: Request, res: Response) => {
    const date = new Date();

    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        // Perform an aggregation on the User collection
        // It aggregates user data from the past year.
        const data = await User.aggregate([
            // Stage 1: Match documents created in the last year
            {$match: {createdAt: {$gte: lastYear}}},
            {
                // Stage 2: Project a new field "month" with the month component of "createdAt"
                // The $month operator, which extracts the month component from the createdAt field of each document.
                $project: {
                    month: {$month: "$createdAt"} 
                },
            },
            
            // Stage 3: Group documents by the "month" field and calculate the total
            // Groups documents by the month field and calculates the total count of documents within each group. This provides information about how many users were created in each month.    
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1},
                },
            },
        ]);
        // Respond with the aggregated data
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json(error);
    }
}