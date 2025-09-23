import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import chatSlice from "./chatSlice";
import contradictionSlice from "./contradictionSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
    chat: chatSlice.reducer,
    contradiction: contradictionSlice.reducer,
  },
});

export default store;
