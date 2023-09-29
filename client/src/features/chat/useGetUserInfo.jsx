import { useQuery } from "@tanstack/react-query";
import { GetUserInfo } from "../../services/chatAPI";

export default function useGetUserInfo(userId) {
    const queryFn = () => GetUserInfo(userId);
    const queryKey = ["user", userId]
    const { data, isLoading } = useQuery(queryKey, queryFn, {
        enabled: !!userId, // Only fetch when currentUserId is available
    }); // Pass the queryKey as the first argument
    const currentUser = data?.data;
    return { currentUser, isLoading };
}