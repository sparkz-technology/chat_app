import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  isSettings: false,
  changeChat: null,
  selectedChat: null,
  showUserDetails: false,
};

// eslint-disable-next-line react-refresh/only-export-components
const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message += action.payload;
    },
    setIsSettings: (state, action) => {
      state.isSettings = action.payload;
    },
    setChangeChat: (state, action) => {
      state.changeChat = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setShowUserDetails: (state, action) => {
      state.showUserDetails = action.payload;
    },
  },
});

export const { setMessage, setIsSettings, setChangeChat, setSelectedChat, setShowUserDetails } = ChatSlice.actions;

export default ChatSlice.reducer;
