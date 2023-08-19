import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db"
import authRoutes from "./routes/auth"
import userRoutes from "./routes/user"
import productRoutes from "./routes/product"
import cartRoutes from "./routes/cart"
import orderRoutes from "./routes/order"
import stripeRoutes from "./routes/stripe"
const cors = require("cors");

dotenv.config();

const app = express();  // This line creates the app instance by invoking the express() function. This instance is the foundation upon which you build your web application using Express.
const PORT = process.env.PORT || 5000;
connectDB();

app.use(cors());
app.use(express.json()); // Server To accept the json data from Frontend 

// console.log(express); 
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout", stripeRoutes);

app.listen(PORT, (): void => {
    console.log(`Server is running on PORT : ${PORT}`)
})