import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiUser";
import { useSetRecoilState } from "recoil";
import { currentThemeAtom } from "../states/atoms/userAtoms";

export const useUser = () => {
  const setCurrentTheme = useSetRecoilState(currentThemeAtom);

  const { isPending, data, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getUser();
      setCurrentTheme(data?.data?.data?.theme);
      console.log(data);
      return data;
    },
  });

  return { isPending, data, error };
};
