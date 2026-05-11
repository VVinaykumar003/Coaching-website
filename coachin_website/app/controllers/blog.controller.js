const blogModel = require("../models/blog.model");
const cloudinary = require("../config/cloudinary");

function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces → hyphen
    .replace(/-+/g, "-"); // remove extra hyphens
}

const addBlog = async (req, res) => {
  try {
    const file = req.file;
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(500).json({
        message: "All required fields must be filed.",
      });
    }
    let imageUrl = "";
    if (file) {
      const base64 = file.buffer.toString("base64");
      const dataURI = `data:${file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "uploads",
      });

      imageUrl = result.secure_url;
    }
    const slug = await generateSlug(title);

    const blog = await blogModel.create({
      title,
      slug:slug,
      content,
      coverImage: imageUrl,
      // publishedAt:Date.now
    });

    res.status(201).json({
        blog,
        message:"Blog created Sucessfully."
    })
  } catch (error) {
    res.status(500).json({
        message:"Something went wrong",
        error:error.message
    })
  }
};

const getAllBlogs = async(req,res)=>{
    try {
        const blogs = await blogModel.find();

        res.status(200).json({
            blogs,
            message:"Blogs fetched sucessfully."
        })
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong.",
            error:error.message
        })
    }
}


const deleteBlogs = async (req,res)=>{
  try {
    const {id} = req.params;

    const blog = await blogModel.findByIdAndDelete(id);

      if (!blog) {
      return res.status(404).json({
        message: "Blog not found"
      });
    }

    res.status(200).json({
      message:"Blog deleted sucessfully"
    })


  } catch (error) {
    res.status(500).json({
      message:"Something went wrong.",
      error:error.message
    })
  }
}


const updateBlog = async(req,res)=>{
  try {
    const {id} = req.params;
    const updatedData = { ...req.body };

    // If a new image was uploaded, process it and add it to updatedData
    if (req.file) {
      const base64 = req.file.buffer.toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${base64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "uploads",
      });

      updatedData.coverImage = result.secure_url;
    }

    const blog = await blogModel.findByIdAndUpdate(
      id,
      updatedData,
      {
        returnDocument:"after",
        runValidators:true,
      }
    )

    if(!blog){
      return res.status(404).json({
        message:"Blog not found."
      })
    }

    return res.status(200).json({
      message:"Blog updated sucessfully."
    })
  } catch (error) {
    return res.status(500).json({
      message:"Something went wrong.",
      error:error.message
    })
  }
}


module.exports = {
    addBlog,
getAllBlogs,
deleteBlogs,
updateBlog
};
