import { NextFunction, Request, Response } from "express";
const jwt = require ("jsonwebtoken");
const User = require ("../models/userModel");
const CryptoJS = require ("crypto-js");

// For hashing our password we use the cryptojs ; currently we use "cipher algorithm" 

// REGISTRATION
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });

    // save to mongo database ; you can use the save() function to update the changes back to the database.
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        
    } catch (error: any) {
        res.status(500).json(error);
    }
};

// LoGIN
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(401).json("Wrong username")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC); 
        // Convert hashed password into string
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        
        Originalpassword !== req.body.password && res.status(401).json("Wrong credentials")

        const {password, ...others} = user._doc;  // mongoDB stores our document into _doc 

        // JWT.sign(user, secretKey, options);
        const accessToken = jwt.sign({
            _id: user._id,
            isAdmin: user.isAdmin
        }, 
        process.env.JWT_SECRET_KEY,
        {expiresIn: "3d"}  // After the 3 days we are not gonna use this access token again
        );

        res.status(201).json({...others, accessToken});
    } catch (error) {
     res.status(500).json(error)   
    }
}