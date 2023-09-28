import styled from 'styled-components';
import { IoPersonOutline, IoMailOutline } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import Avatar from 'react-avatar';
import { useRef, useState } from 'react';
import { BsFillCameraFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setIsSettings } from '../chat/ChatSlice';
import BackButton from '../../ui/BackButton';

function Settings() {
    const data = JSON.parse(localStorage.getItem('user'));
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(null);
    const imageUploadRef = useRef(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setImage(reader.result)

    }
    const dispatch = useDispatch();

    return (
        <Container>
            <Header>
                <BackButton onClick={() => dispatch(setIsSettings(false))} />

                <h1>Settings</h1>
            </Header>
            <AvatarContainer>
                {
                    image ? <Avatar name={data.name} size="150" round={true} src={image} /> :
                        <Avatar name={data.name} size="150" round={true} src={data.avatarImage} />
                }
                {
                    isEditing && <AvatarEditButton onClick={() => imageUploadRef.current.click()}>
                        <BsFillCameraFill color="#fff" />
                    </AvatarEditButton>
                }
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={imageUploadRef}
                    style={{ display: 'none' }} // Hide the input element
                />


            </AvatarContainer>
            <Section>
                <SectionItem>
                    <IconWrapper>
                        <IoPersonOutline size={24} color="#333" />
                    </IconWrapper>
                    <Data>
                        <Label>Username:</Label>
                        {isEditing ? <Input
                            type="text"
                            value={data.username}
                        /> : <Value>{data.username}</Value>}
                    </Data>
                </SectionItem>
                <SectionItem>
                    <IconWrapper>
                        <FaUser size={24} color="#333" />
                    </IconWrapper>
                    <Data>
                        <Label>Name:</Label>
                        {isEditing ? <Input
                            type="text"
                            value={data.name}
                        /> : <Value>{data.name}</Value>}
                    </Data>
                </SectionItem>
                <SectionItem>
                    <IconWrapper>
                        <IoMailOutline size={24} color="#333" />
                    </IconWrapper>
                    <Data>
                        <Label>Email:</Label>
                        {isEditing ? <Input
                            type="email"
                            value={data.email}
                        /> : <Value>{data.email}</Value>}
                    </Data>
                </SectionItem>
            </Section>
            <ButtonSection>
                <Button onClick={() => setIsEditing(!isEditing)}>{
                    isEditing ? 'Cancel' : 'Edit Profile'}</Button>
                {isEditing && <Button>Save</Button>}
            </ButtonSection>

        </Container>
    );
}

export default Settings;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
    box-sizing: border-box;
    box-shadow: 0 0 0.5rem #00000029;
`;

const Header = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 0.5rem;
    background-color: #0d0c22;
    height: 55px;
    width: 100%;
    border-radius:1rem  0 0 0;
    box-shadow: 0 0 0.5rem #00000029;
    h1 {
        color: white;
        font-size: 1.5rem;
    }
`;



const AvatarContainer = styled.div`
position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1rem;
`;

const AvatarEditButton = styled.button`
    position: absolute;
    bottom: 10px;
    left: 53%;
    background-color: #0d0c22;
    color: #fff;
    border: none;
    border-radius: 50%;
    text-align: center;
    padding: 0.5rem;
    cursor: pointer;
    svg{
        transition: transform 0.3s;
        height: 1.2rem;
        width: 1.2rem;

    }
    
    transition: background-color 0.3s;
    &:hover {
        background-color: #141336;
    }
`;

const Input = styled.input`
    border: none;
    font-size: 0.8rem;
    font-weight: 500;
    color: #333;
    padding: 0;
    box-sizing: border-box;
    background-color: transparent;
    border-bottom: 1px solid #333;
    transition: border-bottom 0.3s;
    &:focus {
        outline: none;
    }

`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    gap: 1rem;
    padding: 1rem;
`;

const SectionItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const IconWrapper = styled.div`
    display: flex;
    align-items: center;
    
    justify-content: center;
    background-color: #f0f0f0;
    border-radius: 50%;
    width: 36px;
    height: 36px;
`;
const Data = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.div`
    font-size: 1rem ;
    font-weight: 500;
    color: #333;
`;

const Value = styled.div`
    color: #777;
    font-size: 0.8rem;
`;
const ButtonSection = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem;
`;
const Button = styled.button`

    background-color: #0d0c22;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: background-color 0.3s;
    &:hover {
        background-color: #141336;
    }
`;