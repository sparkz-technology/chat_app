import styled from 'styled-components';

const WelcomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    text-align: center;
    overflow: hidden;
    position: relative;
    @media (max-width: 768px) {
        display: none;
    }

    

`;

const WelcomeMessage = styled.h1`
    font-size: 4em;
    color: #0d0c22;
    margin: 1rem 0;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    letter-spacing: 2px;
    animation: pulse 2s ease-in-out infinite;
`;

const SubMessage = styled.p`
    font-size: 1.8em;
    margin-top: 1rem;
    line-height: 1.4;
    font-weight: 300;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;



function Welcome() {
    return (
        <WelcomeContainer>
            <WelcomeMessage>Welcome to our Chat App!</WelcomeMessage>
            <SubMessage>Join the conversation and connect with others.</SubMessage>
        </WelcomeContainer>
    )
}

export default Welcome;
