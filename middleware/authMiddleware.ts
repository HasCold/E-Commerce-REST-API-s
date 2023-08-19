import { NextFunction, Request, Response } from "express";
import { userTypes } from "../types/backendTypes";

const jwt = require ("jsonwebtoken");

// declare global: This syntax is used to declare a global augmentation in TypeScript. It tells TypeScript that you're adding or modifying a type definition in the global scope.

// namespace Express: This refers to the express namespace. The express namespace is where various types related to the Express.js framework are defined.

// interface Request: This part of the code is extending the Request interface in the express namespace. The Request interface defines the structure of the HTTP request object in Express applications.

declare global {
    namespace Express {
        interface Request {
            user: userTypes;
        }
    }
}
 
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
// We are using a token Bearer so we have to split the header first

    if (authHeader) {
        const token = authHeader.split(" ")[1];  // token split into array like so we are accessing our token on 1 index ["Bearer", "abjdbadbabasbdad"]

        jwt.verify(token, process.env.JWT_SECRET_KEY, (err: any, user: userTypes) => {
            if(err) res.status(403).json("Token is not valid!")

        req.user = user; 
        next();
        })
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

export const verifyTokenAndAuthorization = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if(req.user._id === req.params.id || req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do that!");
        }
    })
} 

export const verifyTokenAndAdmin = (req: Request, res: Response, next: NextFunction) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed to do that because you are not admin!");
        }
    })
} 