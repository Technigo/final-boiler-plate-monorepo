import { getCategories } from "../../../../services/apiCategory";
import { useQuery } from "@tanstack/react-query";
import { CategoryType } from "../../../../types/flashcardTypes";
export function useCategory() {
  const { isPending, data, error } = useQuery({
    queryKey: ["category"],
    queryFn: getCategories,
  });
  const categories = data?.data?.categories as CategoryType[];
  return { isPending, categories, error };
}
