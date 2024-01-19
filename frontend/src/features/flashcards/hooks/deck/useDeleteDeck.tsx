import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteDeck as deleteDeckApi } from "../../../../services/apiDeck";

export function useDeleteDeck() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteDeck } = useMutation({
    mutationFn: (id: number | string) => deleteDeckApi(id),
    onSuccess: () => {
      toast.success("deck successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["decks"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteDeck };
}
