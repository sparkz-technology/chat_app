import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  display: block;
  font-size: 1rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 0.5rem;
  text-decoration: none;
  color: var(--text-color-black);
`;

export default StyledLink;
