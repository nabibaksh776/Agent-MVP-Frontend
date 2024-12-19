import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GetToken } from "@/components/Server/Cookies";

export const getAllCustomers = createAsyncThunk<any>(
  "getAllCustomers",
  async (_, { rejectWithValue }) => {
    try {
      let authToken = await GetToken();
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customer/`,
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

// update customer
export const AddNewCustomer = createAsyncThunk<
  any, // Return type
  any, // Argument type (change `any` to the actual type of `data`)
  { rejectValue: string } // Optional: Additional options like `rejectValue`
>("AddNewCustomer", async (data, { rejectWithValue }) => {
  try {
    let authToken = await GetToken();
    console.log("authToken?.value---", authToken?.value);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/customer/create/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${authToken?.value}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      const message = error.response.data.message || "Network error";
      return rejectWithValue(message);
    } else if (error.response?.status === 400) {
      const message = error.response.data.message || "Network error";
      return rejectWithValue(message);
    } else {
      return rejectWithValue("Network error or server not reachable");
    }
  }
});

// api to delete Customer
// api to delete Customer
// api to delete Customer
// api to delete Customer
// api to delete Customer
export const DeleteCustomer = createAsyncThunk<
  any, // Return type
  any, // Argument type (change `any` to the actual type of `data`)
  { rejectValue: string } // Optional: Additional options like `rejectValue`
>("DeleteCustomer", async (data, { rejectWithValue }) => {
  try {
    let authToken = await GetToken();
    console.log("authToken?.value---", authToken?.value);
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/customer/${data.id}/`,
      {
        headers: {
          Authorization: `Bearer ${authToken?.value}`,
        },
      },
    );
    if (response.status == 200) {
      return response.data;
    }
  } catch (error: any) {
    if (error.response?.status === 404) {
      const message = error.response.data.message || "Network error";
      return rejectWithValue(message);
    } else if (error.response?.status === 400) {
      const message = error.response.data.message || "Network error";
      return rejectWithValue(message);
    } else {
      return rejectWithValue("Network error or server not reachable");
    }
  }
});

// edit Customer
// edit Customer
// edit Customer
// edit Customer
// edit Customer
// edit Customer
export const EditCustomer = createAsyncThunk<
  any, // Return type
  any, // Argument type (change `any` to the actual type of `data`)
  { rejectValue: string } // Optional: Additional options like `rejectValue`
>("EditCustomer", async (data, { rejectWithValue }) => {
  try {
    let authToken = await GetToken();
    console.log("authToken?.value---", authToken?.value);
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/customer/update/${data.id}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${authToken?.value}`,
        },
      },
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      const message = error.response.data.message || "Network error";
      return rejectWithValue(message);
    } else if (error.response?.status === 400) {
      const message = error.response.data.message || "Network error";
      return rejectWithValue(message);
    } else {
      return rejectWithValue("Network error or server not reachable");
    }
  }
});
