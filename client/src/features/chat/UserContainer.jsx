import { useSelector } from "react-redux";
import Avatar from "react-avatar";
import useGetUserInfo from "./useGetUserInfo";
import styled from "styled-components";

const Label = styled.p`
  font-size: 16px;
  color: #080808;
`;

const Username = styled.h2`
  font-size: 20px;
  margin: 10px 0;
  color: #333;
`;

const Email = styled.p`
  font-size: 16px;
  color: #777;
  margin-bottom: 20px;
`;

const Name = styled.p`
  font-size: 16px;
  color: #777;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
  @media (max-width: 768px) {
    margin-bottom: 0px;
    }
`;

const Info = styled.div`
  min-width: 300px;
  padding: 20px;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;
  box-shadow: 0 0 0.5rem #00000029;
  margin-top: 30px;
  max-width: 700px;
  padding:  20px;

  @media (max-width: 768px) {
    /* Adjust styles for screens with a maximum width of 768px */
    flex-direction: column;
    max-width: 90%;
    padding: 0px;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  color: #fff;
  margin: 0;
  text-align: start;
  box-sizing: border-box;
  text-transform: capitalize;
  padding: 5px 10px;
  border-radius: 50px;
  background-color: #0d0c22;
`;

const StyledUserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  box-sizing: border-box;
`;



function UserContainer() {
  const { changeChat } = useSelector((state) => state.chat);
  const { currentUser } = useGetUserInfo(changeChat?._id);

  return (
    <StyledUserContainer>
      <Container>
        <Header>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",

            }}
          >
            <Title>User Info</Title>
          </div>
          <Avatar
            name={currentUser?.username}
            size="150"
            round={true}
            src={currentUser?.avatarImage}
          />
        </Header>
        <Info>
          <Label>Username:</Label>
          <Username>{currentUser?.username}</Username>
          <Label>Name:</Label>
          <Name>{currentUser?.name}</Name>
          <Label>Email:</Label>
          <Email>{currentUser?.email}</Email>
        </Info>
      </Container>
    </StyledUserContainer>
  );
}

export default UserContainer;
