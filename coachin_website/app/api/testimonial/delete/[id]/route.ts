import { NextRequest, NextResponse } from "next/server";
import Testimonial from "@/app/models/testimonial.model";
import { connectDB } from "@/app/lib/mongodb";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    
    // Extract the dynamic [id] parameter from the URL
    const id = params.id;

    // Attempt to find and delete the document in MongoDB
    const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

    if (!deletedTestimonial) {
      return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Testimonial deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json({ message: "Failed to delete testimonial", error: error.message }, { status: 500 });
  }
}