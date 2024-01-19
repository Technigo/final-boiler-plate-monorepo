import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCategory as createCategoryApi } from "../../../../services/apiCategory";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { mutate: createCategory, isPending: isCreating } = useMutation({
    mutationFn: createCategoryApi,
    onSuccess: () => {
      toast.success("new category is created");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCategory };
}
