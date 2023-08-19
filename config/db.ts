const mongoose = require ("mongoose");
const colors = require ("colors");
const dotenv = require ('dotenv');

dotenv.config();

const connectDb = async () => {
    try {
   const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
   })
    console.log(colors.cyan.underline(`MongoDB Atlas Successfully connected : ${conn.connection.host}`))
        
    } catch (error: any) {
        console.log(colors.red.bold(`Error: ${error.message}`))
        process.exit();
    }
}

export default connectDb;