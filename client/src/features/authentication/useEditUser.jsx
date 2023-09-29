import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { EditUser } from "../../services/chatAPI";

function useEditUser(setIsEditing) {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem("userId");
    const mutationFn = (value) => EditUser(value, userId);
    const { mutate, isLoading } = useMutation(mutationFn, {
        onSuccess: () => {
            toast.success("Edit successful");
            setIsEditing(false);
            queryClient.invalidateQueries(["user", userId]);

            // localStorage.setItem("user", JSON.stringify(data.user));

        },
        onError: (error) => {
            toast.error(error.response.data.message || "Edit failed");
        },
    });
    return { mutate, isLoading };

}

export default useEditUser
