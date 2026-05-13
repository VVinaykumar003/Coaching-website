import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    slug:{
        type:String,
        unique:true,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
    },
    publishedAt:{
        type:Date,
        default:Date.now,
        required:true,
    }

},{timestamps:true})

export default mongoose.models.blogs ||
  mongoose.model("blogs", blogSchema);