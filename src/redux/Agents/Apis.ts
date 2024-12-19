import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GetToken } from "@/components/Server/Cookies";

// get All Agents
export const GetALLAgentsByCustomerID = createAsyncThunk<
  any,
  { id: string | number }
>(
  "GetALLAgentsByCustomerID",
  async (data: { id: string | number }, { rejectWithValue }) => {
    try {
      let authToken = await GetToken();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/agents/${data?.id}/`,
        {
          headers: {
            Authorization: `Bearer ${authToken?.value}`, // Include the token in the Authorization header
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

//
//
//
// Create New Agent
//
//
//
export const CreateNewAgent = createAsyncThunk<any, { formData: any }>(
  "CreateNewAgent",
  async (formData, { rejectWithValue }) => {
    try {
      // Retrieve the authentication token
      const authToken = await GetToken();

      console.log("FormData content: in api--", formData);
      // Make the POST request with formData
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/agents/`, // Endpoint including id
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken?.value}`, // Attach the Bearer token
            "Content-Type": "multipart/form-data", // Explicitly set the content type
          },
        },
      );

      // Return the API response data on success
      return response.data;
    } catch (error: any) {
      // Handle and return errors appropriately
      if (error.response?.status === 400) {
        const message = error.response.data.message || "Network error";
        return rejectWithValue(message);
      }
      return rejectWithValue(
        error.response?.data || "Network error or server not reachable",
      );
    }
  },
);

// get Single Agent By id
// get Single Agent By id
// get Single Agent By id
// get Single Agent By id
export const GetSingleAgentById = createAsyncThunk<any, { data: any }>(
  "GetSingleAgentById",
  async (data: any, { rejectWithValue }) => {
    try {
      // Retrieve the authentication token
      const authToken = await GetToken();

      // Make the POST request with formData
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/agent/${data?.id}/`, // Endpoint including id
        {
          headers: {
            Authorization: `Bearer ${authToken?.value}`, // Attach the Bearer token
            "Content-Type": "multipart/form-data", // Explicitly set the content type
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

// update agent by agent ID
export const UpdateAgent = createAsyncThunk<any, { formData: any }>(
  "UpdateAgent",
  async (formData: any, { rejectWithValue }) => {
    try {
      // Retrieve the authentication token
      const authToken = await GetToken();

      console.log("FormData content: in api--", formData);
      let agent_id = formData.get("agent_id");
      // Make the POST request with formData
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/agents/v2/${agent_id}/`, // Endpoint including id
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken?.value}`, // Attach the Bearer token
            // "Content-Type": "multipart/form-data", // Explicitly set the content type
          },
        },
      );

      // Return the API response data on success
      return response.data;
    } catch (error: any) {
      // Handle and return errors appropriately
      if (error.response?.status === 400) {
        const message = error.response.data.message || "Network error";
        return rejectWithValue(message);
      }
      return rejectWithValue(
        error.response?.data || "Network error or server not reachable",
      );
    }
  },
);

// Delete Agent by id

export const DeleteAgentById = createAsyncThunk<any, { data: any }>(
  "DeleteAgentById",
  async (data: any, { rejectWithValue }) => {
    try {
      // Retrieve the authentication token
      const authToken = await GetToken();

      // Make the POST request with formData
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/agents/v2/${data?.id}/`, // Endpoint including id
        {
          headers: {
            Authorization: `Bearer ${authToken?.value}`, // Attach the Bearer token
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




// 
// 
// 
// 
// delete agent document by id
export const DeleteAgentDocumentById = createAsyncThunk<any, { data: any }>(
  "DeleteAgentDocumentById",
  async (data: any, { rejectWithValue }) => {
    try {
      // Retrieve the authentication token
      const authToken = await GetToken();

      // Make the POST request with formData
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/agentdocs/v2/${data?.id}/`, // Endpoint including id
        {
          headers: {
            Authorization: `Bearer ${authToken?.value}`, // Attach the Bearer token
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







// upload the agent file/document
export const AgentDocumentUpload = createAsyncThunk<any, { formData: any }>(
  "AgentDocumentUpload",
  async (formData: any, { rejectWithValue }) => {
    try {
      // Retrieve the authentication token
      const authToken = await GetToken();

      // Make the POST request with formData
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/agentdocs/v2/`, // Endpoint including id
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken?.value}`, // Attach the Bearer token
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
