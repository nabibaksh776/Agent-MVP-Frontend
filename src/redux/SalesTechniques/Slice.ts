import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetSalesTechniquesByAgentID,
  UpdateSalesTechnique,
  UploadSalesTechniqueDocumentsByID,
  DeleteSalesTechniqueDocumentById,
} from "./Apis";
import { toast } from "react-toastify";

// Define the initial state
const initialState: any = {
  salesTechnique: {
    loading: false,
    error: null,
    data: null,
  },
  upateSalesTechnique: {
    loading: false,
    error: null,
    data: null,
  },
  uploadSalesDocx: {
    loading: false,
    error: null,
    data: null,
  },
};

export const SalesTechniqueSlice = createSlice({
  name: "SalesTechniqueSlice",
  initialState,
  reducers: {
    HandleSalesTechniqueDocuments(state, action) {
      let {type,id} = action.payload;
      if(type == "remove"){
        let salesTechniqueData = JSON.parse(JSON.stringify(state.salesTechnique.data))
        let fullData = salesTechniqueData.data
        let documents = salesTechniqueData.data.documents.filter(
          (document: any) => document.id !== id,
        );
        console.log("remain docx---", documents)
        salesTechniqueData.data.documents = documents
        console.log("salesTechniqueData---", salesTechniqueData)
        state.salesTechnique.data = salesTechniqueData
      }
    },
  },
  extraReducers: (builder) => {
    // Upload the agent documents
    builder.addCase(GetSalesTechniquesByAgentID.pending, (state, action) => {
      state.salesTechnique.loading = true;
      state.salesTechnique.error = null;
      state.salesTechnique.data = null;
    });
    builder.addCase(GetSalesTechniquesByAgentID.fulfilled, (state, action) => {
      state.salesTechnique.loading = false;

      
      if(action.payload.data !== null){
        state.salesTechnique.data = action.payload;
      }
      
    });
    builder.addCase(
      GetSalesTechniquesByAgentID.rejected,
      (state: any, action: any) => {
        state.salesTechnique.loading = false;
        state.salesTechnique.error = action.payload;
      },
    );

    // Update Sales Technique
    builder.addCase(UpdateSalesTechnique.pending, (state, action) => {
      state.upateSalesTechnique.loading = true;
      state.upateSalesTechnique.error = null;
    });
    builder.addCase(UpdateSalesTechnique.fulfilled, (state, action) => {
      state.upateSalesTechnique.loading = false;
      state.upateSalesTechnique.data = action.payload;
      toast.success("Sales Technique Updated Successfully");

      state.salesTechnique.data = action.payload;
    });
    builder.addCase(
      UpdateSalesTechnique.rejected,
      (state: any, action: any) => {
        state.upateSalesTechnique.loading = false;
        state.upateSalesTechnique.error = action.payload;
        toast.success("Please try later..");
      },
    );

    // Update Sales Technique
    builder.addCase(
      UploadSalesTechniqueDocumentsByID.pending,
      (state, action) => {
        state.uploadSalesDocx.loading = true;
        state.uploadSalesDocx.error = null;
      },
    );
    builder.addCase(
      UploadSalesTechniqueDocumentsByID.fulfilled,
      (state, action) => {
        state.uploadSalesDocx.loading = false;
        state.uploadSalesDocx.data = action.payload;
        toast.success("file uploaded successfully");
        let currentSalesT = JSON.parse(JSON.stringify(state.salesTechnique));
        let alldocuments = currentSalesT.data.data.documents;
        alldocuments.push(action.payload.data);
        currentSalesT.data.data.documents = alldocuments;
        state.salesTechnique.data = currentSalesT.data;
      },
    );
    builder.addCase(
      UploadSalesTechniqueDocumentsByID.rejected,
      (state: any, action: any) => {
        state.uploadSalesDocx.loading = false;
        state.uploadSalesDocx.error = action.payload;
        toast.success("Please try later..");
      },
    );
    //
    //
    //
    // Delete sales technique document
    builder.addCase(
      DeleteSalesTechniqueDocumentById.pending,
      (state, action) => {},
    );
    builder.addCase(
      DeleteSalesTechniqueDocumentById.fulfilled,
      (state, action) => {
        
        toast.success("document deleted successfully");
      },
    );
    builder.addCase(
      DeleteSalesTechniqueDocumentById.rejected,
      (state: any, action: any) => {
        toast.error("Try again later..");
      },
    );
  },
});

export const { HandleSalesTechniqueDocuments } = SalesTechniqueSlice.actions;
export default SalesTechniqueSlice.reducer;
