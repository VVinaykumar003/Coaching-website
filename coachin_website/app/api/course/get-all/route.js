import mongoose from "mongoose";
import Course from "../../../models/course.model";
import  {connectDB}  from "../../../lib/mongodb";

export const GET = async (request) => {
  try {
    await connectDB();
    const courses = await Course.find();
    return new Response(JSON.stringify(courses), {
      status: 200,
      headers: {"Content-Type": "application/json",},
    });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", {status: 500});
  }
};