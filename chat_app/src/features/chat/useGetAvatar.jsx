import { useQuery } from "@tanstack/react-query";

import { getAvatar } from "../../services/chatAPI";

export default function useGetAvatar(type) {
  const queryKey = ["avatar", type];
  const queryFn = () => getAvatar(type);

  const { data, isLoading, error } = useQuery(queryKey, queryFn);

  return { data, isLoading, error };
}
