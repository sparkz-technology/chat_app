import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styled from "styled-components";
import { BsWechat } from "react-icons/bs";
import Avatar from 'react-avatar';
import { AiFillSetting } from "react-icons/ai"
import { FaEllipsisV } from "react-icons/fa";

import Logout from "../authentication/Logout";
import Settings from "../authentication/Settings";
import useGetAllUser from "./useGetAllUser";
import { setChangeChat, setIsSettings, setSelectedChat, setShowUserDetails } from "./ChatSlice";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import useGetUserInfo from "./useGetUserInfo";

function Users() {
  // const [currentSelected, setCurrentSelected] = useState(undefined);
  const { selectedChat: currentSelected } = useSelector((state) => state.chat);

  const [isDropup, setIsDropup] = useState(false);
  const dispatch = useDispatch();
  const ref = useOutsideClick(() => setIsDropup(false));
  const { isSettings } = useSelector((state) => state.chat);
  const { currentUser, isLoading } = useGetUserInfo(localStorage.getItem("userId"));

  const changeCurrentChat = (index, contact) => {
    // setCurrentSelected(index);
    dispatch(setSelectedChat(index))
    dispatch(setShowUserDetails(false));

    dispatch(setChangeChat(contact))

  };

  const { data: contacts } = useGetAllUser();

  if (!contacts) {
    return (
      <Container>
        <Brand>
          <Logo />
          <h3>Chat App</h3>
        </Brand>
        <Contacts>
          <ContactItem>
            <div className="avatar">
              <Avatar name="loading" size="40" round={true} />
            </div>
            <div className="username">
              <h3>loading</h3>
            </div>
          </ContactItem>
        </Contacts>
        <CurrentUser>
          <div className="avatar">
            <Avatar name="loading" size="40" round={true} />
          </div>
          <div className="username">
            <h2>loading</h2>
          </div>
        </CurrentUser>
      </Container>
    );
  }


  return (
    <>
      {isSettings ? <Settings /> : <>
        <Container>
          <Brand>
            <Logo />
            <h3>Chat App</h3>
          </Brand>
          <Contacts>
            {contacts.map((contact, index) => (
              <ContactItem
                key={contact._id}
                className={`contact-item ${index === currentSelected ? "selected" : ""}`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <Avatar name={contact.username} size="40" round={true} src={contact.avatarImage} />
                </div>
                <div className={`username ${index === currentSelected ? "selectedUsername" : ""}`}>
                  <h3>{contact.username}</h3>
                </div>
              </ContactItem>
            ))}
          </Contacts>

          <CurrentUser>
            <div className="avatar">
              <Avatar name={!isLoading ? currentUser?.username : "loading"} size="40" round={true} src={currentUser?.avatarImage} />
              <div className="username">
                <h2>{currentUser?.username}</h2>
              </div>
            </div>
            <DropUpButton ref={ref}>
              <button onClick={() => setIsDropup(!isDropup)} style={{ border: "none", background: "none" }}>
                <FaEllipsisV size={20} color="white" />
              </button>{
                isDropup && <DropupContent>
                  <BgNoneButton onClick={() => {
                    setIsDropup(false);
                    dispatch(setIsSettings(true));
                  }
                  }>
                    <ButtonText>Settings</ButtonText>
                    <AiFillSetting size={20} />
                  </BgNoneButton>
                  <Logout />
                </DropupContent>

              }
            </DropUpButton>
          </CurrentUser>
        </Container>
      </>}

    </>

  );
}

const ButtonText = styled.p`
  margin:0px;
  text-align: start;
`;

const DropUpButton = styled.div`
  position: relative;
  display: inline-block;

`;

const DropupContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #f9f7fc;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.29);
  z-index: 1;
  right: 0;
  bottom: 2rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  gap: 0.5rem;
  width: 7rem;
  align-items: center;
  border: 1px solid #f9f7fc;
  transition: 0.5s ease-in-out;
`;

const BgNoneButton = styled.button`
  display: flex;

  align-items: center;
  justify-content: space-between;
  width: 100%;

  border: none;
  cursor: pointer;
  background-color: transparent;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out, transform 0.1s ease-in-out;
  position: relative;
  padding: 5px;
  border-radius: 5px;
  gap: 10px;
  &:hover {
    background-color: #ebebeb;
    transform: scale(1.1);
    
  }

  


`;
const Logo = styled(BsWechat)`
  height: 3rem;
`;
const colors = {
  primary: "#0d0c22",
  secondary: "#f2efff",
  background: "#f9f7fc",
  text: "#000000",
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 79% 15%;
  overflow: hidden;
  background-color: ${colors.secondary};
  border-radius: 1rem 0 0  1rem ;

  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.29);
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background-color: ${colors.secondary};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.29);

  h3 {
    color: ${colors.primary};
    text-transform: uppercase;
  }
`;

const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 0.8rem;

  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: ${colors.secondary};
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
`;

const ContactItem = styled.div`
  min-height: 2rem;
  cursor: pointer;
  width: 90%;
  border-radius: 0.2rem;
  padding: 0.4rem;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  transition: 0.5s ease-in-out;
  border: 1px solid ${colors.secondary};
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.29);
  &:hover {
    background-color: ${colors.primary};
    color: white;

    .username {
      h3 {
        color: white;
      }
    }
  }
  &:first-child {
    margin-top: 0.5rem;
  }
  .avatar {
    img {
      height: 3rem;
    }
  }

  &.selected {
    background-color: ${colors.primary};
    color: white;

    .username {
      h3 {
        color: white;
      }
    }
  }

  .avatar,
  .username {
    h3 {
      color: ${colors.text};
    }
  }
`;

const CurrentUser = styled.div`
  background-color: ${colors.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  height: 4rem;
  padding: 0 1rem;
  position: relative;


  .avatar {
    display:  flex;
    align-items: center;
    gap: 1rem;

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
`;

export default Users;
