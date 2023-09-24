import { useQuery } from "@tanstack/react-query";
import { GetMsg } from "../../services/chatAPI";

export default function useGetMsg(UserId, currentChat) {
  const values = { from: UserId, to: currentChat._id };
  const queryFn = () => GetMsg(values);

  const { data, isLoading, isError } = useQuery(
    ["messages", UserId, currentChat._id],
    queryFn
  );

  return { data, isLoading, isError };
}
