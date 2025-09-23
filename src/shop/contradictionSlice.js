import { createSlice } from "@reduxjs/toolkit";

const contradictionSlice = createSlice({
  name: "contradiction",
  initialState: {
    messages: ['set'],
  },
  reducers: {
    addMessage(state, action) {
      state.messages = [...state.messages, action.payload];
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const contradictionActions = contradictionSlice.actions;
export default contradictionSlice;
