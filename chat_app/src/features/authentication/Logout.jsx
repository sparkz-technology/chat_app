import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";

import MiniSpinner from "../../ui/MiniSpinner";
import useLogout from "./useLogout";

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
  background-color: #0d0c22;
  position: absolute;
  top: 0.8rem;
  right: 0.5rem;

  border: none;
  cursor: pointer;
  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }
`;
