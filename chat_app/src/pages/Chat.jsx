import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import styled from "styled-components";
import Users from "../features/chat/Users";
import Container from "../features/chat/Container";
import Welcome from "../features/chat/Welcome";

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
            <Welcome />
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
  background-image: linear-gradient(
  45deg,
  hsl(240deg 100% 20%) 0%,
  hsl(346deg 83% 51%) 100%,
  hsl(55deg 100% 50%) 100%
);



  .container {
    height: 85vh;
    width: 85vw;
    background-color: #f4f4fa;
    display: grid;
    grid-template-columns: 25% 75%;
    box-shadow: 0.5rem 0.5rem 0.5rem #00000029;
    border-radius: 1rem;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
