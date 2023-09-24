/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Input from "./Input";
import { v4 as uuidv4 } from "uuid";
import useSendMsg from "./useSendMsg";
import useGetMsg from "./useGetMsg";
import Avatar from "react-avatar";
import toast from "react-hot-toast";

export default function ChatContainer({ currentChat, socket }) {
  const UserId = localStorage.getItem("userId")

  const [messages, setMessages] = useState([]);
  const [isOnline, setIsOnline] = useState(false)
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { mutate: setMsg } = useSendMsg();
  const { data: messagesData } = useGetMsg(UserId, currentChat);
  useEffect(() => {
    if (messagesData) setMessages(messagesData);
  }, [messagesData]);
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
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (socket.current) {
      socket.current.emit("check-online", currentChat._id);
      socket.current.on("is-online", (data) => {
        setIsOnline(data);
      });

      socket.current.on("is-offline", () => {
        setIsOnline(false); // Set the user as offline
        toast.error(`${currentChat.username} is offline`);
      });
    }
  }, [socket, currentChat._id, currentChat.username]);




  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <Avatar name={currentChat.username} size="40" round={true} src={currentChat.avatarImage} />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
          <p style={{ color: isOnline ? "green" : "red" }}>
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >
                <div className="content ">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Input handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
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
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #0d0c22;
      }
    }
  }
`;
