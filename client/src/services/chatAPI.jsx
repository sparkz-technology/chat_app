import axios from "axios";
import { API_URL } from "../utils/Constant";
import Cookies from 'js-cookie'


const USER_API_URL = `${API_URL}/user`;
const MSG_API_URL = `${API_URL}/msg`;


export async function GetAllUsers(id) {
  const response = await axios.get(`${USER_API_URL}/all/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return response.data;
}

export async function SendMsg(values) {
  console.log(values);
  const { from, to, message } = values;
  const response = await axios.post(`${MSG_API_URL}/addmsg`, {
    from,
    to,
    message,
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return response.data;
}

export async function GetMsg(values) {
  const { from, to } = values;
  const response = await axios.post(`${MSG_API_URL}/getmsg`, {
    from,
    to,
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return response.data;
}

export async function EditUser(values, userId) {
  console.log(values);
  const response = await axios.patch(`${USER_API_URL}/edit/${userId}`, values, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return response.data;
}

export async function GetUserInfo(userId) {
  const response = await axios.get(`${USER_API_URL}/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  });
  return response.data;
}
