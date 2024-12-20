import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    GetChatHistoryByAgentID
} from "./API";
import { toast } from "react-toastify";

// Define the initial state
const initialState: any = {
  chatHistoryData: {
    loading: false,
    error: null,
    data: null,
  }
};

export const ChatSlice = createSlice({
  name: "ChatSlice",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    // Upload the agent documents
    builder.addCase(GetChatHistoryByAgentID.pending, (state, action) => {
      state.chatHistoryData.loading = true;
      state.chatHistoryData.error = null;
    });
    builder.addCase(GetChatHistoryByAgentID.fulfilled, (state, action) => {
      state.chatHistoryData.loading = false;
      state.chatHistoryData.data = action.payload.data;
    });
    builder.addCase(
        GetChatHistoryByAgentID.rejected,
      (state: any, action: any) => {
        state.chatHistoryData.loading = false;
        state.chatHistoryData.error = action.payload;
      },
    );
  },
});


export default ChatSlice.reducer;
