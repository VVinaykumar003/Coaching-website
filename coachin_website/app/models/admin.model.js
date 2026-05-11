import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    adminId:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true})

const adminModel = mongoose.model("admin",adminSchema);

module.exports = adminModel;