import axios from "axios";
export async function GetAllUsers(id) {
  const response = await axios.get(`http://localhost:8000/user/all/${id}`);
  return response.data;
}

export async function SendMsg(values) {
  console.log(values);
  const { from, to, message } = values;
  const response = await axios.post(`http://localhost:8000/msg/addmsg`, {
    from,
    to,
    message,
  });
  return response.data;
}

export async function GetMsg(values) {
  const { from, to } = values;
  const response = await axios.post(`http://localhost:8000/msg/getmsg`, {
    from,
    to,
  });
  return response.data;
}
