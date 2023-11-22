import { useEffect, useState } from "react";
import { BiWinkSmile } from "react-icons/bi";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import styled from "styled-components";
import toast from "react-hot-toast";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  padding: 10px;
  border-top: 1px solid #ddd;
  position: relative;
`;

const EmojiButton = styled(BiWinkSmile)`
  font-size: 2.5rem;
  cursor: pointer;
  margin-right: 10px;
  color: #0d0c22;
`;

const InputForm = styled.form`
  display: flex;
  flex: 1;
  background-color: #fff;
  border-radius: 25px;
  padding: 5px;
  align-items: center;
  box-shadow: 0 0 0.5rem #00000029;
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
  background-color: #0d0c22;
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
    background-color: #141336;
  }
`;

const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 70px;
  left: 0px;
  z-index: 1;
`;

import { useOutsideClick } from "../../hooks/useOutsideClick";
import { useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { setIstyping } from "./ChatSlice";
Input.propTypes = {
  handleSendMsg: PropTypes.func.isRequired,
};
function Input({ handleSendMsg }) {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  // const message = useSelector((state) => state.chat.message);
  const dispatch = useDispatch();

  const emojiPickerRef = useOutsideClick(() => {
    setShowEmojiPicker(false);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (trimmedMessage === "") return toast.error("Message cannot be empty");
    if (trimmedMessage !== "") {
      console.log(trimmedMessage); // Simulate sending the message to a chat room
      handleSendMsg(trimmedMessage);
      dispatch(setMessage(""));

    }
  };
  useEffect(() => {
    message !== "" ? dispatch(setIstyping(true)) : dispatch(setIstyping(false));
  }, [message, dispatch]);

  return (
    <>
      <InputContainer>
        <EmojiButton onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
        {showEmojiPicker && (
          <EmojiPickerContainer ref={emojiPickerRef}>
            <Picker
              searchDisabled
              onEmojiClick={(emoji) =>
                setMessage((prev) => prev + emoji.emoji)
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
            autoComplete="off"
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
