import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";
import { connectDB } from "@/app/lib/mongodb";
import testimonialModel from "@/app/models/testimonial.model"; // Change to your course.model if needed

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();
    
    // Get ID from the URL search params (?id=123) or from the formData
    const id = req.nextUrl.searchParams.get("id") || (formData.get("id") as string);
    
    if (!id) {
      return NextResponse.json({ message: "ID is required." }, { status: 400 });
    }

    const updatedData: any = {};

    // Extract all text fields from formData dynamically
    formData.forEach((value, key) => {
      if (key !== "image" && key !== "id") {
        updatedData[key] = value;
      }
    });

    const imageFile = formData.get("image") as File | null;

    // If a new image was uploaded, process it and upload to Cloudinary via stream
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "uploads" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      updatedData.image = result.secure_url;
    }

    const record = await testimonialModel.findByIdAndUpdate(id, updatedData, {
      new: true, // Replaces `returnDocument: "after"`
      runValidators: true,
    });

    if (!record) {
      return NextResponse.json({ message: "Record not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Record updated successfully." }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Something went wrong.", error: error.message },
      { status: 500 }
    );
  }
}