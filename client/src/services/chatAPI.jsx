import axios from "axios";
import { API_URL } from "../utils/Constant";

const USER_API_URL = `${API_URL}/user`;
const MSG_API_URL = `${API_URL}/msg`;
const headers = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export async function GetAllUsers(id) {
  const response = await axios.get(`${USER_API_URL}/all/${id}`, headers);
  return response.data;
}

export async function SendMsg(values) {
  console.log(values);
  const { from, to, message } = values;
  const response = await axios.post(`${MSG_API_URL}/addmsg`, {
    from,
    to,
    message,
  }, headers);
  return response.data;
}

export async function GetMsg(values) {
  const { from, to } = values;
  const response = await axios.post(`${MSG_API_URL}/getmsg`, {
    from,
    to,
  }, headers);
  return response.data;
}

export async function EditUser(values, userId) {
  const response = await axios.patch(`${USER_API_URL}/edit/${userId}`, values, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
}

export async function GetUserInfo(userId) {
  const response = await axios.get(`${USER_API_URL}/${userId}`, headers);
  return response.data;
}
