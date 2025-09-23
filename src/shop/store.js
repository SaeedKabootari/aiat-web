import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import webSocketSlice from "./webSocketSlice";
import contradictionSlice from "./contradictionSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
    webSocket: webSocketSlice.reducer,
    contradiction: contradictionSlice.reducer,
  },
});

export default store;
