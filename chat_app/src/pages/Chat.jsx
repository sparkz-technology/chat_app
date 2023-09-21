import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import Users from "../features/chat/Users";
import Container from "../features/chat/Container";

export default function Chat() {
  const socket = useRef();
  const [currentChat, setCurrentChat] = useState(undefined);

  const host = "http://localhost:8000";

  useEffect(() => {
    const currentUserId = localStorage.getItem("userId");

    if (currentUserId) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUserId);
    }
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
      <Cont>
        <div className="container">
          <Users changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <h1>Welcome to Chat App</h1>
          ) : (
            <Container currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Cont>
    </>
  );
}

const Cont = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;

  /* background-color: #131324; */

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #f4f4fa;
    display: grid;
    grid-template-columns: 25% 75%;
    box-shadow: 0.5rem 0.5rem 0.5rem #00000029;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
