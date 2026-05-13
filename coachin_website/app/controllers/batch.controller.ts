const batch = require("../models/Batch.model");

const addBatch = async(req,res)=>{
try {
    // console.log(req.body)
    const {batchName,batchSize,startingDate,timing} = req.body;

    if(!batchName||!batchSize||!startingDate||!timing){
        res.status(403).json({
            message:"All required fields must be filled."
        })
    }

    const newBatch = await batch.create({
        batchName,
        batchSize,
        startingDate,
        timing
    })

    res.status(201).json({
        message:"Batch Created",
        newBatch
    })
} catch (error) {
    res.status(500).json({
        error:error,
        message:"Something went wrong"
    })
   
}}


const getAllBatch = async(req,res)=>{
    try {
        const allBatch = await batch.find();

        res.status(200).json({
            message:"All batches are fetched.",
            allBatch
        })
    } catch (error) {
        res.status(500).json({
            error:error,
            message:"Something went wrong."
        })
    }
}


module.exports = {
    addBatch,
    getAllBatch
}