const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    first_name: String, 
    last_name:String, 
    email:String, 
    age:Number,
    password:String
})

module.exports = mongoose.model("user", userSchema)