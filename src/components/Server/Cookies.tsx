"use server";

import { cookies } from "next/headers";

export const CreateCookies = async (data: any) => {
  const cookieStore = await cookies();
  cookieStore.set("authToken", data.access);
};

export const GetToken = async () => {
  const cookieStore = await cookies();
  let token = cookieStore.get("authToken");
  return token;
};

// clear cookies
export const clearCookie = async () => {
  const cookieStore = cookies();
  // Set the 'authToken' with an expired date
  cookieStore.set("authToken", "", {
    path: "/", // Ensure it matches the path used when setting the cookie
    expires: new Date(0), // Expire the cookie by setting it in the past
    httpOnly: true,
  });

  return "Cookie cleared successfully!";
};
