import { getStickers } from "../../../services/apiSticker";
import { useQuery } from "@tanstack/react-query";

export function useGetStickers() {
  const { isPending, data, error } = useQuery({
    queryKey: ["sticker"],
    queryFn: getStickers,
  });
  return { isPending, data, error };
}
