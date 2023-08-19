const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username : {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password:{ type: String ,required:true },
    isAdmin : {
        type: Boolean, 
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema); // When you call mongoose.model() on a schema, Mongoose compiles a model for you.