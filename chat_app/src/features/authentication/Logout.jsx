import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";

import MiniSpinner from "../../components/MiniSpinner";
import { useLogout } from "./useLogout";

function Logout() {
  const { mutate, isLoading } = useLogout();
  return (
    <Button onClick={mutate} disabled={isLoading}>
      {isLoading ? <MiniSpinner /> : <BiPowerOff />}
    </Button>
  );
}

export default Logout;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
