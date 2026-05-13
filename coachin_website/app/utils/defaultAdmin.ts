
import adminModel from "../models/admin.model";
import bcrypt from "bcryptjs";
const defaultAdmin = async(req : Request, res : Response)=>{
    try {

        const adminId = process.env.ADMINID;
        const password = process.env.PASSWORD;

        const adminExists = await adminModel.findOne({
            adminId
        })
        // console.log(adminExists)

        if(adminExists){
            console.log("Admin is already present.")
            return;
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const admin = await adminModel.create({
            adminId:adminId,
            password:hashedPassword,
        }) 

        console.log(admin)

        console.log("✅ Default admin created");
    } catch (error) {
        console.log("ℹ️ Admin already exists")
    }
}

module.exports = defaultAdmin;