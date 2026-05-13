import { NextRequest, NextResponse } from "next/server";
import Testimonial from "@/app/models/testimonial.model";
import { connectDB } from "@/app/lib/mongodb";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const formData = await request.formData();
    
    const name = formData.get("name") as string;
    const rank = formData.get("rank") as string;
    const city = formData.get("city") as string;
    const center = formData.get("center") as string;
    const rating = formData.get("rating") as string;
    const message = formData.get("message") as string;
    const imageFile = formData.get("image") as File | null;

    const updateData: any = {};
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
  } catch (error: any) {
    console.error("Error updating testimonial:", error);
    return NextResponse.json({ message: "Failed to update testimonial", error: error.message }, { status: 500 });
  }
}