import mongoose from "mongoose";


const batchSchmea = new mongoose.Schema({
    batchName:{
        type:String,
        required:true,
    },
    batchSize:{
        type:String,
        require:true,
    },
    startingDate:{
        type:Date,
        required:true
    },
    timing:{
        type:String,
        require:true,
    }
},{timestamps:true});


const batch = mongoose.model("batch",batchSchmea);

module.exports = batch;

