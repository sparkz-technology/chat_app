import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  isSettings: false,
  changeChat: null,
};

// eslint-disable-next-line react-refresh/only-export-components
const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setIsSettings: (state, action) => {
      state.isSettings = action.payload;
    },
    setChangeChat: (state, action) => {
      state.changeChat = action.payload;
    },
  },
});

export const { setMessage, setIsSettings, setChangeChat } = ChatSlice.actions;

export default ChatSlice.reducer;
