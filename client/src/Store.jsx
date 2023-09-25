import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "./features/chat/ChatSlice";
const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default store;
