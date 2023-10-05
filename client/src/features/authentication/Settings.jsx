import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoPersonOutline, IoMailOutline } from 'react-icons/io5';
import { FaUser } from 'react-icons/fa';
import Avatar from 'react-avatar';
import { BsFillCameraFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setIsSettings } from '../chat/ChatSlice';
import BackButton from '../../ui/BackButton';
import useEditUser from './useEditUser';
import MiniSpinner from '../../ui/MiniSpinner';
import useGetUserInfo from '../chat/useGetUserInfo';

function Settings() {
    const userId = localStorage.getItem('userId');
    const { currentUser } = useGetUserInfo(userId);
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(null);
    const imageUploadRef = useRef(null);
    const dispatch = useDispatch();

    // Define a Yup validation schema
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters')
            .required('Username is required'),
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
    });

    const initialValues = {
        username: currentUser.username,
        name: currentUser.name,
        email: currentUser.email,
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };
    const { mutate, isLoading } = useEditUser(setIsEditing);
    function handleEditProfile(values) {
        const formData = new FormData();
        formData.append('id', currentUser._id);
        if (values.username !== currentUser.username) {
            formData.append('username', values.username);
        }
        if (values.name !== currentUser.name) {
            formData.append('name', values.name);
        }
        if (values.email !== currentUser.email) {
            formData.append('email', values.email);
        }
        if (image) {
            formData.append('file', image);
        }
        if (values.username === currentUser.username && values.name === currentUser.name && values.email === currentUser.email && !image) {
            return;
        }
        console.log(formData);
        mutate(formData);
    }



    return (
        <Container>
            <Header>
                <BackButton onClick={() => dispatch(setIsSettings(false))} />
                <h1>Settings</h1>
            </Header>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleEditProfile}
            >
                <Form>
                    <AvatarContainer>
                        <Avatar
                            name={currentUser?.name}
                            size="150"
                            round={true}
                            src={!image ? currentUser?.avatarImage : URL.createObjectURL(image)}
                        />

                        {isEditing && (
                            <AvatarEditButton onClick={() => imageUploadRef.current.click()} type="button">
                                <BsFillCameraFill color="#fff" />
                            </AvatarEditButton>
                        )}
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
                                {isEditing ? (
                                    <>
                                        <FieldInput type="text" name="username" maxLength="6" />
                                        <ErrorMessage name="username" component={ErrorLabel} />
                                    </>
                                ) : (
                                    <Value>{currentUser?.username}</Value>
                                )}
                            </Data>
                        </SectionItem>
                        <SectionItem>
                            <IconWrapper>
                                <FaUser size={24} color="#333" />
                            </IconWrapper>
                            <Data>
                                <Label>Name:</Label>
                                {isEditing ? (
                                    <>
                                        <FieldInput type="text" name="name" />
                                        <ErrorMessage name="name" component={ErrorLabel} />
                                    </>
                                ) : (
                                    <Value>{currentUser?.name}</Value>
                                )}
                            </Data>
                        </SectionItem>
                        <SectionItem>
                            <IconWrapper>
                                <IoMailOutline size={24} color="#333" />
                            </IconWrapper>
                            <Data>
                                <Label>Email:</Label>
                                {isEditing ? (
                                    <>
                                        <FieldInput type="email" name="email" />
                                        <ErrorMessage name="email" component={ErrorLabel} />
                                    </>
                                ) : (
                                    <Value>{currentUser.email}</Value>
                                )}
                            </Data>
                        </SectionItem>
                    </Section>
                    <ButtonSection>
                        <Button onClick={() => setIsEditing(!isEditing)} type="button">
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </Button>
                        {isEditing && (
                            <Button type="submit">
                                {isLoading ? <MiniSpinner /> : 'Save'}
                            </Button>
                        )}
                    </ButtonSection>
                </Form>
            </Formik>
        </Container>
    );
}

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
    border-radius: 1rem 0 0 0;
    box-shadow: 0 0 0.5rem #00000029;
    h1 {
        color: white;
        font-size: 1.5rem;
    }
    @media (max-width: 768px) {
        border-radius: 0;
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
    svg {
        transition: transform 0.3s;
        height: 1.2rem;
        width: 1.2rem;
    }
    transition: background-color 0.3s;
    &:hover {
        background-color: #141336;
    }
`;

const FieldInput = styled(Field)`
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
    font-size: 1rem;
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

const ErrorLabel = styled.div`
    color: red;
    font-size: 0.8rem;
`;

export default Settings;
