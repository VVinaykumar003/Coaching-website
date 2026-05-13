import { NextResponse , NextRequest } from "next/server";
import adminModel from "../models/admin.model";
import bcrypt from "bcryptjs";
const defaultAdmin = async(req : NextRequest, res : NextResponse )=>{
    try {

        const adminId = process.env.ADMINID;
        const password = process.env.PASSWORD;

        if (!adminId || !password) {
            console.warn("ADMINID or PASSWORD is not defined in environment variables.");
            return;
        }

        const adminExists = await adminModel.findOne({
            adminId
        })
        // console.log(adminExists)

        if(adminExists){
            console.log("Admin is already present.")
            return;
        }

        const hashedPassword = await bcrypt.hash(password ,10);

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

export default defaultAdmin;