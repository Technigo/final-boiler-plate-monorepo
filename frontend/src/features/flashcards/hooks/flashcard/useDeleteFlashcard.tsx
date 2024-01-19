import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteFlashCard } from "../../../../services/apiFlashcard";

export function useDeleteFlashcard() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteFlashcard } = useMutation({
    mutationFn: (id: number | string | undefined) => deleteFlashCard(id),
    onSuccess: () => {
      toast.success("Flashcard successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["deck"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteFlashcard };
}
