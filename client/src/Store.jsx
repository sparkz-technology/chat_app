import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "./features/chat/ChatSlice";
const Store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export default Store;
