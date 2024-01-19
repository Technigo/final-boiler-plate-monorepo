import { getDatesOfDecks } from "../services/apiDeck";
import { useQuery } from "@tanstack/react-query";
import { DeckResType } from "../types/flashcardTypes";

export function useDecksDates(categoryId: string, query: string) {
  const { isPending, data, error } = useQuery({
    queryKey: ["decksWithDate", { categoryId, query }],
    queryFn: () => getDatesOfDecks(categoryId, query),
  });

  const decksDates = data as DeckResType;

  return { isPending, decksDates, error };
}
