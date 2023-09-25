import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
};

// eslint-disable-next-line react-refresh/only-export-components
const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setMessage } = ChatSlice.actions;

export default ChatSlice.reducer;
