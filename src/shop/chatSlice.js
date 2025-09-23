import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: '',
  },
  reducers: {
    addMessage(state, action) {
      // state.messages.push(action.payload);
      state.messages = action.payload
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice;
