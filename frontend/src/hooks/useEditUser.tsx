import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "../services/apiUser";
import { User } from "../types/userType";

export const useEditUser = () => {
  const queryClient = useQueryClient();
  const { mutate: editUser, isPending: isEditing } = useMutation({
    mutationFn: (newData: User) => updateUser(newData),
    onSuccess: () => {
      toast.success("User successfully edited ");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editUser };
};
