import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Cookies from 'js-cookie'

import { login } from "../../services/authenticationAPI";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const mutationFn = (value) => login(value);
  const { mutate, isLoading } = useMutation(mutationFn, {
    onSuccess: (data) => {
      toast.success("Login successful");
      localStorage.setItem("token", data.token);
      Cookies.set('token', data.token, { expires: 7 });

      localStorage.setItem("userId", data.user._id);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.response.data.message || "Login failed");
    },
  });
  return { mutate, isLoading };
}
