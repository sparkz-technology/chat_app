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
