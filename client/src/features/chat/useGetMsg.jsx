import { useQuery } from "@tanstack/react-query";
import { GetMsg } from "../../services/chatAPI";

export default function useGetMsg(UserId, currentChat) {
  // Check if currentChat is not null or undefined before accessing its _id property
  const values = { from: UserId, to: currentChat ? currentChat._id : null };

  const queryFn = () => GetMsg(values);

  const { data, isLoading, isError } = useQuery(
    ["messages", UserId, currentChat ? currentChat._id : null],
    queryFn,
    {
      // only fetch when the currentChat is not null
      enabled: !!currentChat,

    }
  );

  return { data, isLoading, isError };
}
