import { NextResponse } from "next/server";
import { cookies } from "next/headers"; // For accessing cookies

export async function middleware(request: any) {
  // Define the public routes that do not require authentication
  console.log("middleware is working--");
  const publicRoutes = ["/login", "/register", "/reset-password"];

  const { pathname } = request.nextUrl;

  // Log the pathname for debugging

  // If the request is to a public route, let it continue without any check
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Access cookies using the new method in middleware
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken"); // Replace with the actual cookie name if different

  // Log for debugging
  console.log("authToken from cookies: ", authToken);

  // If there is no authToken (i.e., the user is not authenticated), redirect to login
  if (!authToken) {
    const loginUrl = new URL("/login", request.url); // Redirect to login page
    loginUrl.searchParams.set("next", pathname); // Append the current path for post-login redirection
    return NextResponse.redirect(loginUrl);
  }

  // If authToken exists, allow the user to continue to protected routes like /dashboard, /about, etc.
  return NextResponse.next();
}

//
//
// Protected routes
//
// Configure the middleware to protect routes
export const config = {
  matcher: ["/dashboard", "/about", "/profile", "/settings"], // Add any routes to protect here
};
