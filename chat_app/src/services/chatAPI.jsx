import axios from "axios";
export async function GetAllUsers(id) {
  const response = await axios.get(`http://localhost:8000/users/all/${id}`);
  return response.data;
}
