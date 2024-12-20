"use client";

import { configureStore } from "@reduxjs/toolkit";
import { Action } from "redux"; // Import Action from 'redux'
import { ThunkAction } from "@reduxjs/toolkit"; // Correct import for ThunkAction
import Auth_States from "./Auth/Auth";
import CustomerSlice from "./Customer/Slice";
import AgentsSlice from "./Agents/Slice";
import SalesTechniqueSlice from "./SalesTechniques/Slice";
import chat from './chat/Slice'
// Define the types for the state
export interface RootState {
  Auth_States: ReturnType<typeof Auth_States>;
}

// Configure the store
export const store = configureStore({
  reducer: {
    Auth_States: Auth_States,
    CustomerSlice: CustomerSlice,
    AgentsSlice: AgentsSlice,
    SalesTechniqueSlice: SalesTechniqueSlice,
    chatSlice: chat,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Define types for the dispatch and thunk actions
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
