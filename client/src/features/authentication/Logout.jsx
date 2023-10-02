import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";
import MiniSpinner from "../../ui/MiniSpinner";
import useLogout from "./useLogout";

function Logout() {
  const { mutate, isLoading } = useLogout();

  return (
    <>
      {isLoading ? <MiniSpinner style={{ margin: "auto" }} /> :
        <StyledButton onClick={mutate} disabled={isLoading}>

          <ButtonText>Logout</ButtonText>
          <BiPowerOff size={20} />

        </StyledButton>
      }
    </>
  );
}

export default Logout;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: none;
  cursor: pointer;
  background-color: transparent;
  font-size: 18px;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out, transform 0.1s ease-in-out;
  position: relative;
  width: 100%;
  padding: 5px;
  gap: 10px;
  margin: auto;
  border-radius: 5px;
  &:hover {
    background-color: #ebebeb;
    transform: scale(1.1);
    
  }



`;

const ButtonText = styled.p`
  margin:0px;
  text-align: start;
  

`;

