import { NextResponse } from "next/server";
import Testimonial from "../../../../models/testimonial.model";
import { connectDB } from "../../../../lib/mongodb";

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    // Extract the dynamic [id] parameter from the URL
    const { id } = await params;

    // Attempt to find and delete the document in MongoDB
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Testimonial deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ message: "Failed to delete testimonial" }, { status: 500 });
  }
}