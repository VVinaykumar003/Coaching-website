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

export default mongoose.models.admin ||
  mongoose.model("admin", adminSchema);