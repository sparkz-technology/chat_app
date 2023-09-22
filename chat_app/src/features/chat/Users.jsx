/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BsWechat } from "react-icons/bs";
import Avatar from 'react-avatar';

import useGetAllUser from "./useGetAllUser";
import Logout from "../authentication/Logout";

export default function Users({ changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserImage, setCurrentUserImage] = useState(null);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage || data.username);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  const { data: contacts } = useGetAllUser();

  if (!contacts) {
    return <div>Error: Unable to load contacts.</div>;
  }
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <Logo />
            <h3>Chat App</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${index === currentSelected ? "selected" : ""
                    }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <Avatar name={contact.username} size="40" round={true} src={contact.avatarImage} />
                  </div>
                  <div className="username">
                    <h3
                      className={` ${index === currentSelected ? "selectedUsername" : ""
                        }`}
                    >
                      {contact.username}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <Avatar name={currentUserName} size="40" round={true} src={currentUserImage} />

            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
            <Logout />
          </div>
        </Container>
      )}
    </>
  );
}

const Logo = styled(BsWechat)`
  height: 3rem;
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 79% 15%;
  overflow: hidden;
  background-color: #f2efff;
  box-shadow: 0 0 0.5rem #00000029;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    padding: 0.5rem;
    box-shadow: 0 0 0.5rem #00000029;

    h3 {
      color: #0d0c22;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #f7f7f7;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #f9f7fc;
      min-height: 2rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      box-shadow: 0 0 0.5rem #00000029;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        box-sizing: border-box;
        h3 {
          color: #0d0c22;
        }
        .selectedUsername {
          color: white;
          transition: 0.5s ease-in-out;
        }
      }
    }
    .selected {
      background-color: #0d0c22;
    }
  }
  .selectedUsername {
    color: white;
  }
  .current-user {
    background-color: #0d0c22;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 2rem;
    height: 4rem;
    padding: 0 1rem;
    position: relative;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        margin: 0;

        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
