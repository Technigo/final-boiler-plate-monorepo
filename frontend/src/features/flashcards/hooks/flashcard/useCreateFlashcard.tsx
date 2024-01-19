import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createFlashCard } from "../../../../services/apiFlashcard";

export function useCreateFlashcard() {
  const queryClient = useQueryClient();
  const { mutate: createFlashcard, isPending: isCreating } = useMutation({
    mutationFn: createFlashCard,
    onSuccess: () => {
      toast.success("new Flashcard is created");
      queryClient.invalidateQueries({ queryKey: ["deck"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createFlashcard };
}
