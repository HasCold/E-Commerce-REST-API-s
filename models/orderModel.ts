import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    userId : {type: String, required: true},
    products: [
        {
            productId: {type: String},
            quantity: {type: Number, default: 1}
        }
    ],
    amount: {type: Number, required: true},
    address: {type: Object, required: true},
    status: {type: String, default: "pending"},
}, {
    timestamps: true
});

export const Order = model("Order", orderSchema); // When you call mongoose.model() on a schema, Mongoose compiles a model for you.