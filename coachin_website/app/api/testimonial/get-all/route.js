import mongoose from "mongoose";
import testimonial from "../../../models/testimonial.model";
import  {connectDB}  from "../../../lib/mongodb";

export const GET = async (request) => {
  try {
    await connectDB();
    const testimonials = await testimonial.find();
    return new Response(JSON.stringify(testimonials), {
      status: 200,
      headers: {"Content-Type": "application/json",},
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {status: 500});
  }
};