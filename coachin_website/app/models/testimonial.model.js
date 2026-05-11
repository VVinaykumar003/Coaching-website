import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    rating:{
        type:Number,
        default:5
    },
},{timestamps:true})


export default mongoose.models.testimonials ||
  mongoose.model("testimonials", testimonialSchema);