import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createSticker as createStickerApi } from "../../../services/apiSticker";

export function useCreateSticker() {
  const queryClient = useQueryClient();
  const {
    mutate: createSticker,
    isPending: isCreating,
    error: errorCreating,
  } = useMutation({
    mutationFn: createStickerApi,
    onSuccess: () => {
      toast.success("new Sticker is created");
      queryClient.invalidateQueries({ queryKey: ["sticker"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createSticker, errorCreating };
}
