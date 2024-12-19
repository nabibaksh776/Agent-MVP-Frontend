import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";

// Check the token validity
const checkToken = async (token: any) => {
  console.log("this is token to test--", token);

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/current_user/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status === 200) {
      return true;
    } else {
      console.log("Token is invalid or unauthorized response.");
      return false;
    }
  } catch (error) {
    return false;
  }
};

// Middleware function
export async function middleware(request: NextRequest) {
  const publicRoutes = ["/login", "/register"];

  // Get cookies and specifically the 'authToken'
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken"); // Get the authToken cookie
  const { pathname } = request.nextUrl;

  console.log("middleware is working--");
  console.log("authToken from cookies: ", authToken?.value); // Log cookie value

  // Case 1: If the route is public and the user is authenticated (has authToken)
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    console.log(`Accessing a public route: ${pathname}`);

    if (authToken?.value) {
      //   const result = await checkToken(authToken.value); // Use authToken from cookies
      const result = await checkToken(authToken?.value); // Use authToken from cookies
      console.log("is Authenticated for public route--", result);
      if (result) {
        // Redirect to the dashboard if the user is authenticated
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else {
        // Proceed if the token is invalid (user can stay on public routes like /login)
        return NextResponse.next();
      }
    } else {
      // Proceed normally if no authToken (user can stay on public routes)
      return NextResponse.next();
    }
  }

  // Case 2: If the route is protected (like /dashboard or /about) and there's no authToken
  if (
    !authToken?.value &&
    !publicRoutes.some((route) => pathname.startsWith(route))
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname); // Save the path to redirect after login
    return NextResponse.redirect(loginUrl); // Redirect to login page if there's no authToken
  }

  // Case 3: If there is an authToken, validate it
  if (authToken?.value) {
    const result = await checkToken(authToken?.value); // Validate authToken
    console.log("is Authenticated for protected route--", result);

    if (!result) {
      console.log("Invalid token, redirecting to login...");
      return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login if the token is invalid
    } else {
      console.log("Token is valid, allowing access...");
      return NextResponse.next(); // Proceed to protected route if the token is valid
    }
  }

  // Allow access if there is no issue
  return NextResponse.next();
}

// Config to protect routes like /dashboard, /about, etc.
export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard",
    "/profile",
    "/agents/list",
    "/customer/agents/:id*",
    "/agents/create/:id*"
  ], // Include public routes
};
