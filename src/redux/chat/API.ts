import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GetToken } from "@/components/Server/Cookies";





export const GetChatHistoryByAgentID = createAsyncThunk<any, { data: any }>(
    "GetChatHistoryByAgentID",
    async (data: any, { rejectWithValue }) => {
      try {
        // Retrieve the authentication token
        const authToken = await GetToken();
  
        // Make the POST request with formData
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/getchathistorybyagentid/${data.id}/`, 
          {
            headers: {
              Authorization: `Bearer ${authToken?.value}`, // Include the token in the Authorization header
            },
          },
        );
  
        // Return the API response data on success
        return response.data;
      } catch (error: any) {
        // Handle and return errors appropriately
        if (error.response?.status === 404) {
          const message = error.response.data.message || "Network error";
          return rejectWithValue(message);
        }
        return rejectWithValue(
          error.response?.data || "Network error or server not reachable",
        );
      }
    },
  );