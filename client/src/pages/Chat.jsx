import { useEffect, useState } from "react";
import styled from "styled-components";

import Users from "../features/chat/Users";
import Container from "../features/chat/Container";
import { useSelector } from "react-redux";
import useSocket from "../features/chat/useSocket";


export default function Chat() {
  // const socket = useRef();
  const socket = useSocket();


  const currentUserId = localStorage.getItem("userId");
  useEffect(() => {
    if (currentUserId && socket) {
      socket.on("connect", () => {
        socket.emit("add-user", currentUserId);
      });

      socket.on("connect_error", (error) => {
        console.log("Socket connection error:", error);
      });

      return () => {
        socket.disconnect();
        socket.off();
      };
    }
  }, [currentUserId, socket]);
  const { selectedChat: currentSelected } = useSelector((state) => state.chat);
  const [show, setShow] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      <Cont>
        <div className="container">
          {
            !show ? (
              <>
                <Users />
                <Container socket={socket} />
              </>
            ) : (
              currentSelected === null ? (
                <Users />
              ) : (
                <Container socket={socket} />
              )
            )
          }
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
    @media (max-width: 768px) {
      grid-template-columns: 100%;
      
      height: 100vh;
      width: 100vw;
      border-radius: 0;
    }

  
  }
`;
