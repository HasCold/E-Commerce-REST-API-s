import { Request, Response } from "express";

const stripe = require("stripe")(process.env.STRIPE_KEY);

export const createPayment = (req: Request, res: Response) => {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd"
        },
        (stripeErr: any, stripeRes: any) => {
            if(stripeErr){
                res.status(500).json(stripeErr);
            }else{
                res.status(200).json(stripeRes);
            }
        }
    )
} // Directly test the stripe payment method to the client side ; not recommended to test on POSTman