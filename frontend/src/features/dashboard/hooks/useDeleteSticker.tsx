import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteSticker as deleteStickerApi } from "../../../services/apiSticker";
export function useDeleteSticker() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteSticker } = useMutation({
    mutationFn: (id: number | string | undefined) => deleteStickerApi(id),
    onSuccess: () => {
      toast.success("Sticker successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["sticker"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteSticker };
}
