import axios from "axios";
export async function login(value) {
  const { email, password } = value;
  const response = await axios.post("http://localhost:8000/auth/login", {
    email,
    password,
  });
  const data = response.data;
  return data;
}

export async function signup(value) {
  const { name, username, email, password } = value;
  console.log(value);
  const response = await axios.post("http://localhost:8000/auth/signup", {
    name,
    username,
    email,
    password,
  });
  console.log(response);
  const data = response.data;
  return data;
}

export async function logout(userId) {
  const response = await axios.post("http://localhost:8000/auth/logout", {
    userId,
  });
  const data = response.data;
  return data;
}
