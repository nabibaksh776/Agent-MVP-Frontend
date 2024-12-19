import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define types for the credentials and the return data
interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface ErrorResponse {
  message: string;
}

// LOGIN CUSTOMER
export const LoginCustomer = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: string }
>("LoginCustomer", async (crenditionals, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/login/`,
      crenditionals,
    );
    return response.data;
  } catch (error: any) {
    // Check if error response exists and has a status
    if (error.status == 404) {
      console.log("this is response---", error.response.data.message);
      const message = error.response.data.message || "Network error";
      return rejectWithValue(message);
    } else {
      // Handle cases where error.response does not exist
      return rejectWithValue("Network error or server not reachable");
    }
  }
});

export const CurrentUser = createAsyncThunk<any, { token: string }>(
  "CurrentUser",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/current_user/`,
        {
          headers: {
            Authorization: `Bearer ${data?.token}`, // Include the token in the Authorization header
          },
        },
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log("this is response---", error.response.data.message);
        const message = error.response.data.message || "Network error";
        return rejectWithValue(message);
      } else if (error.response?.status === 403) {
        const message = error.response.data.detail || "Network error";
        return rejectWithValue(message);
      } else {
        return rejectWithValue("Network error or server not reachable");
      }
    }
  },
);

export const RefreshTokenAPI = createAsyncThunk<any, { token: string }>(
  "RefreshTokenAPI",
  async (data: any, { rejectWithValue }) => {
    console.log("data is here--", data);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/token/refresh/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${data?.refresh}`, // Include the token in the Authorization header
          },
        },
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        const message = error.response.data.message || "Network error";
        return rejectWithValue(message);
      } else {
        return rejectWithValue("Network error or server not reachable");
      }
    }
  },
);

// logout API
export const LogoutAPI = createAsyncThunk<any, { token: string }>(
  "LogoutAPI",
  async (data: any, { rejectWithValue }) => {
    let token: any = localStorage.getItem("token");
    let tokenJSON = JSON.parse(token);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/logout/`,
        tokenJSON,
        {
          headers: {
            Authorization: `Bearer ${tokenJSON?.access}`, // Include the token in the Authorization header
          },
        },
      );
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        console.log("this is response---", error.response.data.message);
        const message = error.response.data.message || "Network error";
        return rejectWithValue(message);
      } else {
        return rejectWithValue("Network error or server not reachable");
      }
    }
  },
);
