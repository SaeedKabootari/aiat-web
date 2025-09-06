import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";
import webSocketSlice from "./webSocketSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
    webSocket: webSocketSlice.reducer
  },
});

export default store;
