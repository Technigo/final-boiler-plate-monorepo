import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCategory as deleteCategoryApi } from "../../../../services/apiCategory";

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCategory } = useMutation({
    mutationFn: (id: number | string) => deleteCategoryApi(id),
    onSuccess: () => {
      toast.success("Category successfully deleted");
      queryClient.invalidateQueries({
        queryKey: ["category"],
        type: "active",
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCategory };
}
