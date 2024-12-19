import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getAllCustomers,
  AddNewCustomer,
  DeleteCustomer,
  EditCustomer,
} from "./Apis";
import { toast } from "react-toastify";

// Define the initial state
const initialState: any = {
  allCustomers: {
    loading: false,
    error: null,
    data: [],
  },
};

export const CustomerSlice = createSlice({
  name: "CustomerSlice",
  initialState,
  reducers: {
    // RESET_CURRENTUser(state, action: PayloadAction<any>) {
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(AddNewCustomer.pending, (state) => {
      state.allCustomers.loading = true;
      state.allCustomers.error = null;
    });
    // add New Customer
    builder.addCase(AddNewCustomer.fulfilled, (state, action) => {
      state.allCustomers.loading = false;
      state.allCustomers.error = null;
      state.allCustomers.data = action.payload;
      toast.success("Customer Created");
    });
    // add New Customer
    builder.addCase(AddNewCustomer.rejected, (state, action) => {
      state.allCustomers.loading = false;
      state.allCustomers.error = action.payload;
      toast.error(action.payload);
    });
    // add New Customer
    builder.addCase(getAllCustomers.pending, (state) => {
      state.allCustomers.loading = true;
      state.allCustomers.error = null;
      state.allCustomers.data = [];
    });
    builder.addCase(getAllCustomers.fulfilled, (state, action) => {
      state.allCustomers.loading = false;
      state.allCustomers.error = null;
      state.allCustomers.data = action.payload;
    });
    builder.addCase(getAllCustomers.rejected, (state, action) => {
      state.allCustomers.loading = false;
      state.allCustomers.error = action.payload;
      state.allCustomers.data = [];
    });

    // handle delete customer
    builder.addCase(DeleteCustomer.pending, (state, action) => {
      state.allCustomers.loading = true;
      state.allCustomers.error = null;
    });
    builder.addCase(DeleteCustomer.fulfilled, (state, action) => {
      state.allCustomers.loading = false;
      state.allCustomers.error = null;
      state.allCustomers.data = action.payload;
      toast.success("Customer Deleted");
    });
    builder.addCase(DeleteCustomer.rejected, (state, action) => {
      state.allCustomers.loading = false;
      state.allCustomers.error = action.payload;
    });

    // update customer
    builder.addCase(EditCustomer.pending, (state, action) => {
      state.allCustomers.loading = true;
      state.allCustomers.error = null;
    });
    builder.addCase(EditCustomer.fulfilled, (state, action) => {
      state.allCustomers.loading = false;
      state.allCustomers.error = null;
      state.allCustomers.data = action.payload;
      toast.success("Customer Edited");
    });
    builder.addCase(EditCustomer.rejected, (state, action) => {
      state.allCustomers.loading = false;
      state.allCustomers.error = action.payload;
      toast.error("Something went wrong try later");
    });
  },
});

// export const { RESET_CURRENTUser } = CustomerSlice.actions;
export default CustomerSlice.reducer;
