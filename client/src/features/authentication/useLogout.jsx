import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

import { logout } from "../../services/authenticationAPI";

export default function useLogout() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const mutationFn = () => logout(userId);
  const { mutate, isLoading } = useMutation(mutationFn, {
    onSuccess: () => {
      toast.success("Logout successful");
      localStorage.clear();
      Cookies.remove('token');
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isLoading };
}
