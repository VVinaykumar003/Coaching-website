import mongoose from "mongoose";
import { NextResponse } from "next/server";
import Blog from "../../../models/blog.model";
import {connectDB} from "../../../lib/mongodb";

export async function POST(request : Request) {
  try {
    await connectDB();
    
    // 1. Parse FormData instead of JSON
    const formData = await request.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");
    const author = formData.get("author") || "Admin"; // Optional fallback
    const imageFile = formData.get("coverImage");

    // Generate a URL-friendly slug from the title
    const slug = (title || "untitled-post")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
      .replace(/(^-|-$)+/g, '');   // Remove leading or trailing hyphens

    let coverImage = "";

    // 2. Process the image if it was uploaded
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      // Convert to Base64 string so it can be saved in MongoDB and rendered in <img src="..." />
      const base64Image = buffer.toString('base64');
      coverImage = `data:${imageFile.type};base64,${base64Image}`;
    }

    const newBlog = new Blog({ title, slug, content, author, category, coverImage });
    await newBlog.save();
    
    return NextResponse.json({ message: "Blog post created successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json({ message: "Failed to create blog post" }, { status: 500 });
  }
}