import {Schema, model} from "mongoose"
 
const productSchema = new Schema({
    title : {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    image: { type: String, required:true },
    categories: { type: Array  },
    size: { type: String},
    color: { type: String},
    price: { type: Number, required:true },
    
}, {
    timestamps: true
});

export const Product = model("Product", productSchema); // When you call mongoose.model() on a schema, Mongoose compiles a model for you.