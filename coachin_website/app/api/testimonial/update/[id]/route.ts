import { NextResponse } from "next/server";
import Testimonial from "../../../../models/testimonial.model";
import { connectDB } from "../../../../lib/mongodb";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const formData = await request.formData();
    
    const name = formData.get("name");
    const rank = formData.get("rank");
    const city = formData.get("city");
    const center = formData.get("center");
    const rating = formData.get("rating");
    const message = formData.get("message");
    const imageFile = formData.get("image");

    const updateData = {};
    if (name) updateData.name = name;
    if (rank) updateData.rank = rank;
    if (city) updateData.city = city;
    if (center) updateData.center = center;
    if (rating) updateData.rating = Number(rating);
    if (message) updateData.message = message;

    // Process the image if a new one was uploaded
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = buffer.toString('base64');
      updateData.image = `data:${imageFile.type};base64,${base64Image}`;
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedTestimonial) {
      return NextResponse.json({ message: "Testimonial not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Testimonial updated successfully", testimonial: updatedTestimonial }, { status: 200 });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ message: "Failed to update testimonial" }, { status: 500 });
  }
}