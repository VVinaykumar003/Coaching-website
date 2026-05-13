import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Admin from "@/app/models/admin.model"; // Ensure you have this model created!
// import bcrypt from "bcryptjs"; // Recommended for password hashing

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { adminId, newPassword } = body;

    if (!adminId || !newPassword) {
      return NextResponse.json({ message: "Admin ID and New Password are required." }, { status: 400 });
    }

    // Find the admin in the database
    const admin = await Admin.findOne({ adminId: adminId });

    if (!admin) {
      return NextResponse.json({ message: "Admin account not found." }, { status: 404 });
    }

    // --- OPTIONAL: Hash the password before saving it ---
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(newPassword, salt);
    // admin.password = hashedPassword;
    
    // Save the new password (plaintext if not using bcrypt)
    admin.password = newPassword; 
    await admin.save();

    return NextResponse.json({ message: "Password updated successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating admin password:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}