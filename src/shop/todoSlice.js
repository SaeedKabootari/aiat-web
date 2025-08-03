import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    toggle: true,
    loggedIn: localStorage.getItem("loggedIn"),
  },
  reducers: {
    changeToggleState(state, action) {
      state.toggle = action.payload;
    },
    changeloggedInState(state, action) {
      state.loggedIn = action.payload;
    },
  },
});

export const todoActions = todoSlice.actions;
export default todoSlice;
