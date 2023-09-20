import { useState } from "react";
import { BiWinkSmile } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  padding: 10px;
  border-top: 1px solid #ddd;
  position: relative;
`;

const EmojiButton = styled(BiWinkSmile)`
  font-size: 3rem;
  cursor: pointer;
  margin-right: 10px;
  color: #3498db;
`;

const InputForm = styled.form`
  display: flex;
  flex: 1;
  background-color: #fff;
  border-radius: 25px;
  padding: 5px;
  align-items: center;
`;

const InputField = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 10px;
  background-color: transparent;
  color: #333;
`;

const SendButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 70px;
  left: 0px;
  z-index: 1;
`;

function Input() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage !== "") {
      console.log(trimmedMessage); // Simulate sending the message to a chat room
      setMessage("");
    }
  };

  return (
    <>
      <InputContainer>
        <EmojiButton onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
        {showEmojiPicker && (
          <EmojiPickerContainer>
            <Picker
              onEmojiClick={(emoji) =>
                setMessage((prevMessage) => prevMessage + emoji.emoji)
              }
            />
          </EmojiPickerContainer>
        )}

        <InputForm onSubmit={handleSubmit}>
          <InputField
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            autoFocus={true}
          />
          <SendButton type="submit">
            <IoMdSend />
          </SendButton>
        </InputForm>
      </InputContainer>
    </>
  );
}

export default Input;
