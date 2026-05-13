import { NextRequest, NextResponse } from "next/server";
import Courses from "@/app/models/course.model";
import cloudinary from "@/app/lib/cloudinary";
import { connectDB } from "@/app/lib/mongodb";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const id = params.id;
    const formData = await req.formData();

    const courseName = formData.get("courseName") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const redirectLink = formData.get("redirectLink") as string;

    const thumbnailFile = formData.get("thumbnail") as File | null;

    if (!courseName || !description || !redirectLink) {
      return NextResponse.json(
        {
          success: false,
          message: "Course Name, Description, and Redirect Link cannot be empty.",
        },
        { status: 400 }
      );
    }

    const updatedData: any = {
      courseName,
      description,
      redirectLink,
    };

    if (category) {
      updatedData.category = category;
    }

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

      updatedData.thumbnail = uploadResponse.secure_url;
    }

    const course = await Courses.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!course) {
      return NextResponse.json({ success: false, message: "Course not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Course updated successfully.",
      course,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Something went wrong.", error: error.message },
      { status: 500 }
    );
  }
}