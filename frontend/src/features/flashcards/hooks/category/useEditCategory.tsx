import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCategory } from "../../../../services/apiCategory";

export function useEditCategory() {
  const queryClient = useQueryClient();
  const { mutate: editCategory, isPending: isEditing } = useMutation({
    mutationFn: ({ id, newData }: { id: number | string; newData: { category: string } }) =>
      updateCategory(id, newData),
    onSuccess: () => {
      toast.success("Category successfully edited ");
      queryClient.invalidateQueries({ queryKey: ["category"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editCategory };
}
