import axios from "axios";
import { API_URL } from "../utils/Constant"

const AUTH_API_URL = `${API_URL}/auth`;
export async function login(value) {
  const { email, password } = value;
  const response = await axios.post(`${AUTH_API_URL}/login`, {
    email,
    password,
  });
  const data = response.data;
  return data;
}

export async function signup(value) {
  const { name, username, email, password } = value;
  console.log(value);
  const response = await axios.post(`${AUTH_API_URL}/signup`, {
    name,
    username,
    email,
    password,
  });
  const data = response.data;
  return data;
}

export async function logout(userId) {
  const response = await axios.post(
    `${AUTH_API_URL}/logout/${userId}`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true, // Include cookies in the request
    }
  );
  const data = response.data;
  return data;
}
