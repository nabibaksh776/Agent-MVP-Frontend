
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GetToken } from "@/components/Server/Cookies";




// upload the agent file/document
export const GetSalesTechniquesByAgentID = createAsyncThunk<any, { data: any }>(
    "GetSalesTechniquesByAgentID",
    async (data: any, { rejectWithValue }) => {
      try {
        // Retrieve the authentication token
        const authToken = await GetToken();
  
        // Make the POST request with formData
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sales-techniques/agent/${data.id}/`, 
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



// Update sales Technique
  export const UpdateSalesTechnique = createAsyncThunk<any, { data: any }>(
    "UpdateSalesTechnique",
    async (data: any, { rejectWithValue }) => {
      try {
        // Retrieve the authentication token
        const authToken = await GetToken();
  
        // Make the POST request with formData
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sales-techniques/${data.id}/`, 
          data,
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





  // Upload sales technique documents by sales technique id
  export const UploadSalesTechniqueDocumentsByID = createAsyncThunk<any, { data: any }>(
    "UploadSalesTechniqueDocumentsByID",
    async (data: any, { rejectWithValue }) => {
      try {
        // Retrieve the authentication token
        const authToken = await GetToken();
  
        // Make the POST request with formData
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/salestechniquedocs/v2/`, 
          data,
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





  // delete sales technique document by id
  // Upload sales technique documents by sales technique id
  export const DeleteSalesTechniqueDocumentById = createAsyncThunk<any, { data: any }>(
    "DeleteSalesTechniqueDocumentById",
    async (data: any, { rejectWithValue }) => {
      try {
        // Retrieve the authentication token
        const authToken = await GetToken();
  
        // Make the POST request with formData
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/salestechniquedocs/v2/${data.id}/`, 
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