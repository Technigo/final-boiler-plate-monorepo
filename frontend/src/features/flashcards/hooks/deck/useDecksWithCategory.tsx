import { getDecksWithCategopry } from "../../../../services/apiDeck";
import { useQuery } from "@tanstack/react-query";
export function useDecksWithCategory(categoryId: string, query: string) {
  const {
    isPending,
    data: decksWithQuery,
    error,
  } = useQuery({
    queryKey: ["decks", { categoryId, query }],
    queryFn: () => getDecksWithCategopry(categoryId, query),
  });
  return { isPending, decksWithQuery, error };
}
