import { NextRequest, NextResponse } from "next/server";
import Testimonial from "@/app/models/testimonial.model";
import cloudinary from "@/app/lib/cloudinary";
import { connectDB } from "@/app/lib/mongodb";

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        const formData = await req.formData();
        
        const name = formData.get("name") as string;
        const message = formData.get("message") as string;
        const rating = formData.get("rating") as string;
        const imageFile = formData.get("image") as File | null;

        if (!name || !message) {
            return NextResponse.json({
                message: "All required fields must be filled."
            }, { status: 400 });
        }

        let imageUrl = "";

        if (imageFile && imageFile.size > 0) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            const uploadResponse: any = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "uploads" },
                    (error: any, result: any) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(buffer);
            });

            imageUrl = uploadResponse.secure_url;
        }

        const testimonial = await Testimonial.create({
            name,
            message,
            rating: rating ? Number(rating) : undefined,
            image: imageUrl, // safe now
        });

        return NextResponse.json({
            testimonial,
            message: "Testimonial created successfully."
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({
            message: "Something went wrong.",
            error: error.message 
        }, { status: 500 });
    }
}