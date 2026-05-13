import mongoose from "mongoose";
import testimonial from "../../../models/testimonial.model";
import  {connectDB}  from "../../../lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    const testimonials = await testimonial.find();
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};