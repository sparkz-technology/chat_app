import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { signup } from "../../services/authenticationAPI";

export default function useSignup() {
  const mutationFn = (value) => signup(value);
  const { mutate, isLoading } = useMutation(mutationFn, {
    onSuccess: () => {
      toast.success("Sign up successful");
    },
    onError: (error) => {
      const { message } = error.response.data;
      toast.error(message);
    },
  });
  return { mutate, isLoading };
}
