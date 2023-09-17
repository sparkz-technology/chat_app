import Styled from "styled-components";

const Input = Styled.input`
  height: 55px;
  border-radius: 10px;
  padding: 0 10px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
  border: 0px;
  width: 100%;
  border: 2px solid  var(--border-color);
  &:hover {
    border-color: var(--hover-color);
    box-shadow: 0px 0px 5px 0px var(--hover-color);
  }
  &:focus {
    border-color: var(--hover-color);
    box-shadow: 0px 0px 5px 0px var(--hover-color);
  }
  &::placeholder {
    color: var(--border-color);
  }
    
`;
export default Input;
