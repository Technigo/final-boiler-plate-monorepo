import { useState } from "react";
import { useEditCategory } from "../../hooks/category/useEditCategory";
import { useCreateCategory } from "../../hooks/category/useCreateCategory";
import { Input } from "../../../../ui/shadcn/Input";
import { ButtonSubmit } from "../../../../ui/buttons/ButtonSubmit";

export const InputSubModalField = ({
  id,
  onClose,
  defaultValue,
}: {
  id?: string | number;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValue?: string;
}) => {
  const [editingValue, setEditingValue] = useState<string>(defaultValue ?? "");
  const { isEditing, editCategory } = useEditCategory();
  const { isCreating, createCategory } = useCreateCategory();
  const [error, setError] = useState(false);

  //handlers
  const handleEditSubmit = (id: string | number) => {
    if (editingValue === "") return setError(true);
    const newData = { category: editingValue };
    editCategory({ id, newData });
    setEditingValue("");
    setError(false);
    onClose(false);
  };

  const handleCreate = () => {
    if (editingValue === "") return setError(true);
    createCategory({ category: editingValue });
    setError(false);
    onClose(false);
  };

  return (
    <>
      <h2 className=" text-lg sm:text-xl font-semibold text-center ">
        {id ? "Edit a Category" : "Create a Category"}
      </h2>
      <div className="px-3 sm:px-6 py-8 sm:py-12 flex flex-col gap-8">
        {error && <p className="text-sm text-red-dark">Please enter a value 🖊️</p>}
        <Input
          type="text"
          placeholder="category..."
          onChange={(e) => setEditingValue(e.target.value)}
          value={editingValue}
          disabled={id ? isEditing : isCreating}
        />
        <ButtonSubmit
          onClick={id ? () => handleEditSubmit(id) : handleCreate}
          text={id ? "Edit" : "Create"}
        />
      </div>
    </>
  );
};
