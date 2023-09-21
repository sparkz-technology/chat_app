import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { login } from "../../services/authenticationAPI";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const mutationFn = (value) => login(value);
  const { mutate, isLoading } = useMutation(mutationFn, {
    onSuccess: (data) => {
      toast.success("Login successful");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      navigate("/chat");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isLoading };
}
