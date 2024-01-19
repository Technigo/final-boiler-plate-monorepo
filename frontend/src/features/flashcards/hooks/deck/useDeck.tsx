import { getDeck } from "../../../../services/apiDeck";
import { useQuery } from "@tanstack/react-query";
export function useDeck(id: number | string | undefined) {
  const {
    isLoading,
    data: deck,
    error,
  } = useQuery({
    queryKey: ["deck"],
    queryFn: () => getDeck(id),
  });
  return { isLoading, deck, error };
}
