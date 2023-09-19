import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export async function getAvatar(value) {
  const response = await axios.get(
    `https://api.multiavatar.com/4645646${value}`
  );
  return response.data;
}
export async function SetAvatar(value, userId) {
  const response = await axios.post(
    `http://localhost:5000/api/user/avatar${userId}`,
    {
      image: value,
    }
  );
  return response.data;
}
