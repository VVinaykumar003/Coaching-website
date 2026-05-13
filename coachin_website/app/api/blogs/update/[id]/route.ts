import { NextResponse } from "next/server";
import Blog from "../../../../models/blog.model";
import { connectDB } from "../../../../lib/mongodb";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    // Extract the dynamic [id] parameter and properly await it
    const { id } = await params;
    const formData = await request.formData();
    
    const title = formData.get("title");
    const content = formData.get("content");
    const category = formData.get("category");
    const author = formData.get("author");
    const imageFile = formData.get("coverImage");

    const updateData = {};
    if (title) {
      updateData.title = title;
      // Generate a new URL-friendly slug if the title is updated
      updateData.slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    if (content) updateData.content = content;
    if (category) updateData.category = category;
    if (author) updateData.author = author;

    // Process the image if a new one was uploaded
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = buffer.toString('base64');
      updateData.coverImage = `data:${imageFile.type};base64,${base64Image}`;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog post updated successfully", blog: updatedBlog }, { status: 200 });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json({ message: "Failed to update blog post" }, { status: 500 });
  }
}
