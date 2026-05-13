const adminModel = require("../models/admin.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const adminLogin = async(req,res)=>{
    try {
        const{adminId,password} = req.body;
        console.log("ADMIN Id and Password : ", adminId,password);

        if(!adminId || !password){
            res.status(500).json({
                message:"Id or password is mising."
            })
        }

        const admin = await adminModel.findOne({
            adminId
        })

        console.log("Admin found in DB : ", admin)

        if(!adminId){
            res.status(404).json({
                message:"Admin not found"
            })
        }

        const isMatch =await bcrypt.compare(password,admin.password);
        console.log("IsMatch :",isMatch)

        if(!isMatch){
            res.status(401).json({
                message:"Invalid credentials"
            })
        }

        const token = jwt.sign({id:admin._id},process.env.JWT_SECRET,{expiresIn:"2d"})

        return res.status(200).json({
            message:"Login Successful",
            token,
            adminId:admin._id
            
        })
        
    } catch (error) {
        console.error("Admin login failed with error")
        
    }
}

const updatePassword = async(req,res)=>{ 
    try {
        const id = req.user.id;

        const {newPassword} = req.body;

        if (!newPassword) {
            return res.status(400).json({
                message: "New password is required"
            });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword,10);

        const admin = await adminModel.findByIdAndUpdate(
            id,
            {password:hashedNewPassword},
            {new:true}
        )

         if (!admin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }
        console.log(admin)

        return res.status(201).json({
            message:"Password Updated Sucessfully"
        })



    } catch (error) {
        return res.status(500).json({
            message:"Password Updation failed"
        })
        
    }
}


module.exports = {
    adminLogin,
    updatePassword
};