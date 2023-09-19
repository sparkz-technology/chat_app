import { useEffect, useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";
import { Buffer } from "buffer";

import loader from "../../assets/loader.gif";
import useGetAvatar from "./useGetAvatar";
import useSetAvatar from "./useSetAvatar";

export default function SetAvatar() {
  const [type, setType] = useState(0);
  const { data: avatarData, isLoading: getAvatarIsLoading } =
    useGetAvatar(type);
  const [avatars, setAvatars] = useState([]);
  useEffect(() => {
    if (type < 3 && avatarData) {
      const buffer = Buffer.from(avatarData, "binary");
      const string = buffer.toString("base64");
      setAvatars((prev) => [...prev, string]);
      setType((index) => index + 1);
    }
  }, [avatarData, type]);

  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const { mutate: setAvatar, isLoading: setAvatarIsLoading } = useSetAvatar();

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      return toast.error("Please select an avatar");
    } else {
      setAvatar(selectedAvatar);
    }
  };

  return (
    <>
      {setAvatarIsLoading || getAvatarIsLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={`avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button onClick={setProfilePicture} className="submit-btn">
            Set as Profile Picture
          </button>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }
  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
        transition: 0.5s ease-in-out;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
  .submit-btn {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;
