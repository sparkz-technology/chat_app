/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Avatar from "react-avatar";

import useGetMsg from "./useGetMsg";
import useSendMsg from "./useSendMsg";
import Input from "./Input";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import TypingLoader from "../../ui/TypingLoader";

// eslint-disable-next-line react/prop-types
export default function ChatContainer({ currentChat, socket }) {
  const UserId = localStorage.getItem("userId");

  const [messages, setMessages] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();
  const { mutate: setMsg } = useSendMsg();
  const { data: messagesData } = useGetMsg(UserId, currentChat);

  useEffect(() => {
    if (messagesData) setMessages(messagesData);
  }, [messagesData]);

  // for typing
  const typingMsg = useSelector((state) => state.chat.message);
  useEffect(() => {
    if (typingMsg !== "") {
      socket.current.emit("typing", {
        to: currentChat._id,
        from: UserId,
      });
    }
    socket.current.on("typing", (data) => {
      if (data.from === currentChat._id) {
        setIsTyping(true);
      }
    }
    );
  }, [typingMsg, currentChat, socket, UserId]);

  useEffect(() => {
    if (typingMsg === "") {
      socket.current?.emit("stop-typing", {
        to: currentChat._id,
        from: UserId,
      });
    }
    socket.current?.on("stop-typing", (data) => {
      if (data.from === currentChat._id) {
        setIsTyping(false);
      }
    });

  }, [socket, currentChat, UserId, typingMsg]);


  const handleSendMsg = async (msg) => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: UserId,
      msg,
    });
    const values = { from: UserId, to: currentChat._id, message: msg };
    setMsg(values);
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      const currentSocket = socket.current;

      currentSocket.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });

      return () => {
        currentSocket.off("msg-receive");
      };
    }
  }, [socket, currentChat]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }
    , [messages]);

  useEffect(() => {
    const currentSocket = socket.current;

    socket.current?.emit("check-online", currentChat?._id);
    toast.error(currentChat?.username + " is offline");
    return () => {
      currentSocket?.emit("check-offline", currentChat?._id);
    }

  }, [currentChat, socket]);

  useEffect(() => {
    const currentSocket = socket.current;
    if (socket.current) {
      socket.current.on("is-online", () => {
        setIsOnline(true);
      });
      socket.current.on("is-offline", (data) => {
        toast.error(currentChat?.username + " is offline");
        if (data === currentChat?._id)
          setIsOnline(false);
      });
    }
    return () => {
      currentSocket?.off("is-online");
      currentSocket?.off("is-offline");
    }

  }, [socket, currentChat]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <Avatar name={currentChat?.username} size="40" round={true} src={currentChat?.avatarImage} />
          </div>
          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
          <p style={{ color: isOnline ? "green" : "red" }}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="chat-messages" >
        {messages.map((message) => (
          <div key={uuidv4()} ref={scrollRef}>
            <div
              className={`message ${message.fromSelf ? "sended" : "received"}`}
            >
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Typing> {isTyping ? (<><p>typing</p>  < TypingLoader /> </>) : ""}</Typing>
      <Input handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Typing = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 55px;
  left: 10px;
  z-index: 1;
  font-size: 0.8rem;
  height: fit-content;
  p {
  font-weight: bolder;
    margin: 0;
  }


`;




const Container = styled.div`
position  : relative;
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #00000029;
    border-radius:0 1rem 1rem 0;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    background-color: #0d0c22;
    box-shadow: 0 0 0.5rem #00000029;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 0.7rem 1rem;
        font-size: 0.9rem;
        border-radius: 1rem;
        color: #d1d1d1;
        p {
          margin: 0;
        }
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        color: #0d0c22;
        background-color: #fff;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #0d0c22;
        color: #fff;
      }
    }
  }
`;