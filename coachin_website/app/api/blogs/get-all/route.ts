import { NextResponse } from "next/server";
import  {connectDB}  from "../../../lib/mongodb";
import Blog from "../../../models/blog.model";

export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find().sort({ createdAt: -1 });
    console.log(blogs);


    return NextResponse.json({
      success: true,
      blogs,
    });
  } catch (error : any) {
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