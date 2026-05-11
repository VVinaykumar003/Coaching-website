const courseModel = require("../models/course.model");
const cloudinary = require("../config/cloudinary")

const addCourse = async (req, res) => {
  try {
    console.log("--- addCourse endpoint hit ---");
    const file = req.file;
    console.log("Received file:", file ? file.originalname : "No file uploaded");

    const { courseName, description,  category,redirectLink } = req.body;
    console.log("Received body:", req.body);

    if (!courseName || !description  || !category || !redirectLink) {
      console.log("Validation failed: Missing required fields.");
      return res.status(400).json({
        message: "All required fields must be filled.",
      });
    }
    let imageUrl = "";
    if (file) {
      console.log("Uploading file to Cloudinary...");
      const base64 = file.buffer.toString("base64");
      const dataURI = `data:${file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "uploads",
        timeout: 120000,
      });

      imageUrl = result.secure_url;
      console.log("Cloudinary upload successful. Image URL:", imageUrl);
    }

    console.log("Creating course in database...");
    const course = await courseModel.create({
        courseName,
        description,
        thumbnail:imageUrl,
        redirectLink,
        category,
    })
    console.log("Course created successfully:", course);

    return res.status(201).json({
        message:"Course created sucessfully",
        course
    })
  } catch (error) {
    console.error("Error in addCourse:", error);
    res.status(500).json({
        error:error.message,
        message:"Something went wrong."
    })
  }
};

const getAllCourses = async(req,res)=>{
    try {
        const courses = await courseModel.find().sort({ _id: -1 });

        return res.status(200).json({
            message:"All Courses fetched.",
            courses
        })
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong",
            error:error.message
        })
    }
}

const deleteCourse = async(req,res)=>{
  try {
    const {id} = req.params;

    const course = await courseModel.findByIdAndDelete(id);

    if(!course){
      return res.status(404).json({
        message:"Course Not found."
      })
    }

    return res.status(200).json({
      message:"Course deleted sucessfully."
    })
  } catch (error) {
    res.status(500).json({
      message:"Something went wrong.",
      error:error.message
    })
  }
}

const updateCourse = async(req,res)=>{
  try {
    const {id} = req.params;
    console.log(id)
    const updatedData = { ...req.body };
    console.log(req.body);

    // Prevent Mongoose Validation Error by explicitly checking required fields
    if (updatedData.courseName === "" || updatedData.description === "" || updatedData.redirectLink === "") {
      return res.status(400).json({
        message: "Course Name, Description, and Redirect Link cannot be empty."
      });
    }

    // If a new thumbnail was uploaded, process it and add it to updatedData
    if (req.file) {
      const base64 = req.file.buffer.toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "uploads",
        timeout: 120000,
      });

      updatedData.thumbnail = result.secure_url;
    }

    const course = await courseModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        returnDocument: "after",
        runValidators:true
      }
    );

    if(!course){
      return res.status(404).json({
        message:"Course not found."
      })
    }

    return res.status(200).json({
      message:"Course updated sucessfully.",
    })
  } catch (error) {
    res.status(500).json({
      message:"Something went wrong.",
      error:error.message
    })
    
  }
}


module.exports = {
    addCourse,
    getAllCourses,
    deleteCourse,
    updateCourse
};