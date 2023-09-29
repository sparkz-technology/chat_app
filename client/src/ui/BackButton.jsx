import styled from "styled-components";
import PropTypes from 'prop-types';
import { FaArrowLeft } from 'react-icons/fa';

BackButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

function BackButton({ onClick }) {
    return (
        <Button onClick={onClick}>
            <FaArrowLeft size={20} color="white" />
        </Button>
    )
}


export default BackButton

const Button = styled.button`
    cursor: pointer;
    background: none;   
    border: none;
    outline: none;
    padding: 10px;
    transition: all 0.3s ease;
    &:hover {
        color: #ffffff29;
        opacity: 0.8;
    }
`;
