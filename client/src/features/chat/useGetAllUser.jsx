import { useQuery } from "@tanstack/react-query";
import { GetAllUsers } from "../../services/chatAPI";

export default function useGetAllUser() {
  // const User = localStorage.getItem("user")
  // const currentUserId = JSON.parse(User)._id;
  const currentUserId = localStorage.getItem("userId");
  const queryFn = () => GetAllUsers(currentUserId);
  const queryKey = ["getAllUsers", currentUserId]; // Make sure to use an array for queryKey
  const { data, isLoading } = useQuery(queryKey, queryFn, {
    enabled: !!currentUserId, // Only fetch when currentUserId is available
  }); // Pass the queryKey as the first argument

  return { data, isLoading };
}
