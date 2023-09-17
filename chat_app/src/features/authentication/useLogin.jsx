import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { login } from "../../services/authenticationAPI";

export default function useLogin() {
  const mutationFn = (value) => login(value);
  const { mutate, isLoading } = useMutation(mutationFn, {
    onSuccess: (data) => {
      toast.success("Login successful");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isLoading };
}
