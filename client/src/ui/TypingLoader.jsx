function TypingLoader() {
    return (
        <Container>
            <div className="typing_loader">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </Container>

    )
}

export default TypingLoader

import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
    margin: 0 2px;

    .typing_loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
    }
    .dot {
        height: 5px;
        width: 5px;
        background-color: #0d0c22;
        border-radius: 50%;
        margin: 0 1px;
        animation: typing 1s infinite;
    }
    .dot:nth-child(2) {
        animation-delay: 0.2s;
    }
    .dot:nth-child(3) {
        animation-delay: 0.4s;
    }
    @keyframes typing {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
`;