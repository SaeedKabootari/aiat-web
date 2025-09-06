import { createSlice } from "@reduxjs/toolkit";

const webSocketSlice = createSlice({
  name: "webSocket",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    clearMessages(state) {
      state.messages = [];
    },
  },
});

export const webSocketActions = webSocketSlice.actions;
export default webSocketSlice;
