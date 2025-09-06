import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    toggle: true,
    loggedIn: localStorage.getItem("loggedIn"),
    // messages: []
  },
  reducers: {
    changeToggleState(state, action) {
      state.toggle = action.payload;
    },
    changeloggedInState(state, action) {
      state.loggedIn = action.payload;
    },
    // addMessage(state , action ){
    //   state.messages.push(action.payload)
    // },
    // clearMessages(state){
    //   state.messages =[]
    // }
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice;
