import { NextRequest, NextResponse } from "next/server";
import Courses from "@/app/models/course.model";
import cloudinary from "@/app/lib/cloudinary";
import { connectDB } from "@/app/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const courseName = formData.get("courseName") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const redirectLink = formData.get("redirectLink") as string;

    const thumbnailFile = formData.get("thumbnail") as File | null;

    if (!courseName || !description || !redirectLink || !category) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    let imageUrl = "";

    if (thumbnailFile && thumbnailFile.size > 0) {
      const arrayBuffer = await thumbnailFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "courses" },
          (error: any, result: any) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      imageUrl = uploadResponse.secure_url;
    }

    const course = await Courses.create({
      courseName,
      description,
      category,
      redirectLink,
      thumbnail: imageUrl,
    });

    return NextResponse.json({
      success: true,
      message: "Course added successfully.",
      course,
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Something went wrong.", error: error.message },
      { status: 500 }
    );
  }
}