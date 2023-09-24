import styled from "styled-components";

const Button = styled.button`
  height: 55px;
  border-radius: 30px;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 600;
  box-sizing: border-box;
  outline: none;
  border: 0px;
  width: 100%;
  color: var(--text-color-white);
  background-color: var(--button-background-color);
  &:hover {
    background-color: var(--button-background-hover-color);
  }
`;
export default Button;
