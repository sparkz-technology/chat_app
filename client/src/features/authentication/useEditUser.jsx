import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { EditUser } from "../../services/chatAPI";

function useEditUser() {
    // const userId = localStorage.getItem("userId ") || "650dc4dea8930c693e515393";
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const mutationFn = (value) => EditUser(value, userId);
    const { mutate, isLoading } = useMutation(mutationFn, {
        onSuccess: (data) => {
            toast.success("Edit successful");
            console.log(data);

            // localStorage.setItem("user", JSON.stringify(data.user));

        },
        onError: (error) => {
            toast.error(error.response.data.message || "Edit failed");
        },
    });
    return { mutate, isLoading };

}

export default useEditUser
