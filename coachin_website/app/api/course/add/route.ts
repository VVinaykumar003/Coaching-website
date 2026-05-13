import { NextRequest, NextResponse } from "next/server";

import Courses from "@/app/models/course.model";
import cloudinary from "@/app/lib/cloudinary";
import connectDB from "@/app/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);

    const imageFile = formData.get("image") as File;

    if (!title || !description || isNaN(price) || !imageFile) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    const arrayBuffer = await imageFile.arrayBuffer();

    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse: any = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "courses",
          },
          (error: any, result: any) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.end(buffer);
      }
    );

    const course = await Courses.create({
      title,
      description,
      price,
      image: uploadResponse.secure_url,
    });

    return NextResponse.json({
      success: true,
      course,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}