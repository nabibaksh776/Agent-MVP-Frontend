import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GetALLAgentsByCustomerID,
  CreateNewAgent,
  GetSingleAgentById,
  UpdateAgent,
  DeleteAgentById,
  DeleteAgentDocumentById,
  AgentDocumentUpload,
} from "./Apis";
import { toast } from "react-toastify";

// Define the initial state
const initialState: any = {
  allAgents: {
    loading: false,
    error: null,
    data: [],
  },
  createAgent: {
    loading: false,
    error: null,
    data: [],
  },
  selectedAgent: {
    loading: false,
    error: null,
    data: [],
  },
  updateAgent: {
    loading: false,
    error: null,
  },
  deleteAgent: {
    loading: false,
    error: null,
    isSuccess: false,
  },
  deleteAgentDocx: {
    loading: false,
    error: null,
    isSuccess: false,
  },
  uploadAgentDocx: {
    loading: false,
    error: null,
    isSuccess: false,
  },
};

export const AgentsSlice = createSlice({
  name: "AgentsSlice",
  initialState,
  reducers: {
    RESET_DELETE_AGENT(state) {
      state.deleteAgent = {
        loading: false,
        error: null,
        isSuccess: false,
      };
    },
    uploadAgentDocxState(state) {
      state.uploadAgentDocx = {
        loading: false,
        error: null,
        isSuccess: false,
      };
    },
    HandleAgentDocuments(state, action) {
      const { type, id } = action.payload;
      let currentAgent = JSON.parse(JSON.stringify(state.selectedAgent.data));
      if (type == "remove") {

        let documents = currentAgent.documents.filter(
          (document: any) => document.id !== id,
        );
        
        state.selectedAgent.data.documents = documents
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetALLAgentsByCustomerID.pending, (state) => {
      state.allAgents.loading = true;
      state.allAgents.error = null;
    });
    // add New Customer
    builder.addCase(GetALLAgentsByCustomerID.fulfilled, (state, action) => {
      state.allAgents.loading = false;
      state.allAgents.error = null;
      state.allAgents.data = action.payload;
    });
    builder.addCase(GetALLAgentsByCustomerID.rejected, (state, action) => {
      state.allAgents.loading = false;
      state.allAgents.error = action.payload;
    });

    // create agent API state
    builder.addCase(CreateNewAgent.pending, (state, action) => {
      state.createAgent.loading = true;
      state.createAgent.error = null;
    });
    builder.addCase(CreateNewAgent.fulfilled, (state, action) => {
      state.createAgent.loading = false;
      state.createAgent.data = action.payload;
      state.createAgent.error = null;
      toast.success("Agent Created Successfully");
    });
    builder.addCase(CreateNewAgent.rejected, (state: any, action: any) => {
      state.createAgent.loading = false;
      state.createAgent.error = action.payload;
      toast.error(action.payload?.message);
    });

    // get Sngle Agent by id
    builder.addCase(GetSingleAgentById.pending, (state, action) => {
      state.selectedAgent.loading = true;
      state.selectedAgent.error = null;
      state.selectedAgent.data = null;
    });
    builder.addCase(GetSingleAgentById.fulfilled, (state, action) => {
      state.selectedAgent.loading = false;
      state.selectedAgent.data = action.payload;
      state.selectedAgent.error = null;
    });
    builder.addCase(GetSingleAgentById.rejected, (state: any, action: any) => {
      state.selectedAgent.loading = false;
      state.selectedAgent.error = action.payload;
      state.selectedAgent.data = null;
    });

    // update Agent
    builder.addCase(UpdateAgent.pending, (state, action) => {
      state.selectedAgent.loading = true;
      state.selectedAgent.error = null;
      state.selectedAgent.data = null;

      // upate code
      state.updateAgent.loading = true;
    });
    builder.addCase(UpdateAgent.fulfilled, (state, action) => {
      state.selectedAgent.loading = false;
      state.selectedAgent.data = action.payload?.data;
      state.selectedAgent.error = null;

      // upate code
      state.updateAgent.loading = false;
      toast.success("Agent Updated Successfully");
    });
    builder.addCase(UpdateAgent.rejected, (state: any, action: any) => {
      state.selectedAgent.loading = false;
      state.selectedAgent.error = action.payload;
      state.selectedAgent.data = null;

      toast.error(action.payload?.message || "Agent not Updated");
    });

    // delete Agent
    builder.addCase(DeleteAgentById.pending, (state, action) => {
      state.deleteAgent.loading = true;
      state.deleteAgent.error = null;
    });
    builder.addCase(DeleteAgentById.fulfilled, (state, action) => {
      state.deleteAgent.loading = false;
      state.deleteAgent.isSuccess = true;
      toast.success("Agent deleted successfully");
    });
    builder.addCase(DeleteAgentById.rejected, (state: any, action: any) => {
      state.deleteAgent.loading = false;
      state.deleteAgent.error = action.payload;
      state.deleteAgent.isSuccess = false;
      toast.error(action.payload?.message || "Agent not Updated");
    });

    // delete agent document
    builder.addCase(DeleteAgentDocumentById.pending, (state, action) => {
      state.deleteAgentDocx.loading = true;
      state.deleteAgentDocx.error = null;
    });
    builder.addCase(DeleteAgentDocumentById.fulfilled, (state, action) => {
      state.deleteAgentDocx.loading = false;
      state.deleteAgentDocx.isSuccess = true;
      toast.success("document deleted successfully");
    });
    builder.addCase(
      DeleteAgentDocumentById.rejected,
      (state: any, action: any) => {
        state.deleteAgentDocx.loading = false;
        state.deleteAgentDocx.error = action.payload;
        state.deleteAgentDocx.isSuccess = false;
        toast.error(action.payload?.message || "Try again later");
      },
    );
    // Upload the agent documents
    builder.addCase(AgentDocumentUpload.pending, (state, action) => {
      state.uploadAgentDocx.loading = true;
      state.uploadAgentDocx.error = null;
    });
    builder.addCase(AgentDocumentUpload.fulfilled, (state, action) => {
      state.uploadAgentDocx.loading = false;
      state.uploadAgentDocx.isSuccess = true;
      toast.success("document uploaded successfully");
      let currentAgent = JSON.parse(JSON.stringify(state.selectedAgent));
      currentAgent.data?.documents.push(action.payload.data);
      state.selectedAgent = currentAgent;
    });
    builder.addCase(AgentDocumentUpload.rejected, (state: any, action: any) => {
      state.uploadAgentDocx.loading = false;
      state.uploadAgentDocx.error = action.payload;
      state.uploadAgentDocx.isSuccess = false;
      toast.error(action.payload?.message || "Try again later");
    });
  },
});

export const { RESET_DELETE_AGENT,HandleAgentDocuments } = AgentsSlice.actions;
export default AgentsSlice.reducer;
