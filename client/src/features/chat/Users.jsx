import { useEffect, useState } from "react";
import styled from "styled-components";
import { BsWechat } from "react-icons/bs";
import Avatar from 'react-avatar';
import useGetAllUser from "./useGetAllUser";
import Logout from "../authentication/Logout";
import PropTypes from 'prop-types';

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
  background-color: ${colors.background};
  min-height: 2rem;
  cursor: pointer;
  width: 90%;
  border-radius: 0.2rem;
  padding: 0.4rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  transition: 0.5s ease-in-out;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.29);
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
`;

function Users({ changeChat }) {
  Users.propTypes = {
    changeChat: PropTypes.func.isRequired,
  };

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
          <Avatar name={currentUserName} size="40" round={true} src={currentUserImage} />
        </div>
        <div className="username">
          <h2>{currentUserName}</h2>
        </div>
        <Logout />
      </CurrentUser>
    </Container>
  );
}

const Logo = styled(BsWechat)`
  height: 3rem;
`;

export default Users;
