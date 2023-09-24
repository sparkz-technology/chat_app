import { useMutation } from "@tanstack/react-query";
import { SendMsg } from "../../services/chatAPI";

export default function useSendMsg() {
  const mutationFn = (values) => SendMsg(values);
  const { mutate, isLoading, error } = useMutation(mutationFn, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate, isLoading, error };
}
