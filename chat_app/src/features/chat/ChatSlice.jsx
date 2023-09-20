import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  currentChat: {
    username: "test",
    avatarImage: "https://img.icons8.com/color/48/000000/chat.png",
  },
  currentUser: {
    _id: "60f7b4b3e6b6a40015f1b0a5",
    username: "test",
    avatarImage: "https://img.icons8.com/color/48/000000/chat.png",
  },
};

// eslint-disable-next-line react-refresh/only-export-components
const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setMessages } = ChatSlice.actions;

export default ChatSlice.reducer;
