import { useQuerie } from "@tanstack/react-query";

import { GetAllUser } from "../../services/chatAPI";

export default function useGetAllUser() {
  const currentUserId = localStorage.getItem("userId");
  const queryFn = () => GetAllUser(currentUserId);
  const { data, isLoading } = useQuerie(queryFn);

  return { data, isLoading };
}
