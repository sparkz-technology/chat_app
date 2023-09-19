import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SetAvatar } from "../../services/chatAPI";
import { useNavigate } from "react-router-dom";
export default function useSetAvatar() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const mutationFn = (value) => SetAvatar(value, userId);
  const { mutate, isLoading } = useMutation(mutationFn, {
    onSuccess: () => {
      toast.success("Avatar set successfully");
      navigate("/");
    },
    onError: (error) => {
      const { message } = error.response.data;
      toast.error(message);
    },
  });
  return { mutate, isLoading };
}
