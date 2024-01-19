import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateFlashCard } from "../../../../services/apiFlashcard";

export function useEditFlashcard() {
  const queryClient = useQueryClient();
  const { mutate: editFlashcard, isPending: isEditing } = useMutation({
    mutationFn: ({ id, newData }: { id: string; newData: { question: string; answer: string } }) =>
      updateFlashCard(id, newData),
    onSuccess: () => {
      toast.success("Flashcard successfully edited");
      queryClient.invalidateQueries({ queryKey: ["deck"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editFlashcard };
}
