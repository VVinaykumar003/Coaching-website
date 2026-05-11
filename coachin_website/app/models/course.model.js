import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    redirectLink:{
        type:String,
        required:true
    },
    category:{
        type:String, 
        default:null     
    }
},{timestamps:true})



export default mongoose.models.courses ||
  mongoose.model("courses", courseSchema);