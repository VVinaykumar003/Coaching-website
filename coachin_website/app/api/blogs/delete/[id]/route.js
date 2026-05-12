import { NextResponse } from "next/server";
import Blog from "../../../../models/blog.model";
import { connectDB } from "../../../../lib/mongodb";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    // Extract the dynamic [id] parameter from the URL
    const { id } = await params;

    // Attempt to find and delete the document in MongoDB
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ message: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Blog post deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json({ message: "Failed to delete blog post" }, { status: 500 });
  }
}