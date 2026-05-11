const testimonialModel = require("../models/testimonial.model");
const cloudinary = require("../config/cloudinary");

// const addTestimonial = async(req,res)=>{
//     try {
//         const file = req.file;
//         const{name,message,rating} = req.body;

//         if(!name || !message){
//             res.status(500).json({
//                 message:"All required are need to filled."
//             })
//         }

//         if(file){
//             const base64 = file.buffer.toString("base64");
//     const dataURI = `data:${file.mimetype};base64,${base64}`;

//     const result = await cloudinary.uploader.upload(dataURI, {
//       folder: "uploads"
//     });
//         }

//         const testimonial = await testimonialModel.create({
//             name,
//             message,
//             rating,
//             image:result.secure_url,
//         })

//         return res.status(201).json({
//             message:"Testimonial created sucessfully."
//         })
//     } catch (error) {
//         return res.status(500).json({
//             message:"Something went wrong."
//         })
        
//     }
// }

const addTestimonial = async (req, res) => {
    try {
        const file = req.file;
        const { name, message, rating } = req.body;

        if (!name || !message) {
            return res.status(400).json({
                message: "All required fields must be filled."
            });
        }

        let imageUrl = "";

        if (file) {
            const base64 = file.buffer.toString("base64");
            const dataURI = `data:${file.mimetype};base64,${base64}`;

            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "uploads"
            });

            imageUrl = result.secure_url;
        }

        const testimonial = await testimonialModel.create({
            name,
            message,
            rating,
            image: imageUrl, // safe now
        });

        return res.status(201).json({
            testimonial,
            message: "Testimonial created successfully."
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong.",
            error: error.message 
        });
    }
};

const getTestimonial = async(req,res)=>{
    try {
        const testimonials = await testimonialModel.find();

        return res.status(200).json({
            testimonials,
            message:"Testimonials fetched sucessfully."
        })
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong."
        })
    }
}

const deleteTestimonial = async(req,res)=>{
    try {
        const {id} = req.params;

        const testimonial = await testimonialModel.findByIdAndDelete(id);

        if(!testimonial){
            return res.status(404).json({
                message:"Testimonial not found."
            })
        }

        return res.status(200).json({
            message:"Testimonial deleted sucessfully."
        })
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong.",
            error:error.message
        })
    }
}


const updateTestimonial = async (req, res)=>{
    try {
        const {id} = req.params;
        const updatedData = { ...req.body };
        console.log("Text Data:", updatedData);
        console.log("File Data:", req.file ? req.file.originalname : "No file received");

        // If a new image was uploaded, process it and add it to updatedData
        if (req.file) {
            const base64 = req.file.buffer.toString("base64");
            const dataURI = `data:${req.file.mimetype};base64,${base64}`;

            const result = await cloudinary.uploader.upload(dataURI, {
                folder: "uploads"
            });

            updatedData.image = result.secure_url;
            console.log("Cloudinary URL:", updatedData.image);
        }

        const testimonial = await testimonialModel.findByIdAndUpdate(
            id,
            updatedData,
            {
                returnDocument:"after",
                runValidators: true
            }
        );

        if(!testimonial){
            return res.status(404).json({
                message:"Testimonial not found."
            })
        }

        return res.status(200).json({
            message:"Testimonial updated sucessfully."
        })
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong.",
            error:error.message
        })
    }
}


module.exports = {
    addTestimonial,
    getTestimonial,
    deleteTestimonial,
    updateTestimonial
};