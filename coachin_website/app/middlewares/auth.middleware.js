import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (!isAdminRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};