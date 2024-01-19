import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSticker } from "../../../services/apiSticker";
import { Sticker } from "../../../types/userType";

export function useUpdateSticker() {
  const queryClient = useQueryClient();
  const { mutate: editSticker, isPending: isEditing } = useMutation({
    mutationFn: ({ id, newData }: { id: string; newData: Sticker }) => updateSticker(id, newData),
    onSuccess: () => {
      //   toast.success("Sticker successfully edited ");
      queryClient.invalidateQueries({ queryKey: ["sticker"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editSticker };
}
