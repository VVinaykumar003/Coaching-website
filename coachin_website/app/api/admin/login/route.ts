import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req : Request ) {
  try {
    const body = await req.json();

    const { adminId, password } = body;

    if (
      adminId !== process.env.ADMINID ||
      password !== process.env.PASSWORD
    ) {
      return NextResponse.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      {
        adminId,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      }
    );

    return NextResponse.json({
      success: true,
      token,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}