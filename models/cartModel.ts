import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    title : {type: String, required: true, unique: true},
    products: [
        {
            productId: {type: String},
            quantity: {type: Number, default: 1}
        }
    ]
}, {
    timestamps: true
});

export const Cart = model("Cart", cartSchema); // When you call mongoose.model() on a schema, Mongoose compiles a model for you.