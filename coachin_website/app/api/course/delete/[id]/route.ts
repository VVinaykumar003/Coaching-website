import { NextRequest, NextResponse } from "next/server";
import courses from "../../../../models/course.model";
import { connectDB } from "../../../../lib/mongodb";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    
    // Extract the dynamic [id] parameter from the URL
    const { id } = await params;
console.log(id)
    // Attempt to find and delete the document in MongoDB
    const deletedCourse = await courses.findByIdAndDelete(id);

    if (!deletedCourse) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Course deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json({ message: "Failed to delete course" }, { status: 500 });
  }
}