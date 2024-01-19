import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createDeck as createDeckApi } from "../../../../services/apiDeck";

export function useCreateDeck() {
  const queryClient = useQueryClient();
  const { mutate: createDeck, isPending: isCreating } = useMutation({
    mutationFn: createDeckApi,
    onSuccess: () => {
      toast.success("new deck is created");
      queryClient.invalidateQueries({ queryKey: ["decks"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createDeck };
}
