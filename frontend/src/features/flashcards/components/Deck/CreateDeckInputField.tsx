import { useState } from "react";
import { SelectCategory } from "../Category/SelectCategory";
import { useCreateDeck } from "../../hooks/deck/useCreateDeck";
import { Input } from "../../../../ui/shadcn/Input";
import { ButtonSubmit } from "../../../../ui/buttons/ButtonSubmit";

export const CreateDeckInputField = () => {
  const { isCreating, createDeck } = useCreateDeck();
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (title === "") return setError(true);
    createDeck({ title: title, category: categoryId });
    setTitle("");
    setError(false);
  };

  return (
    <form className="p-3">
      <div className="flex flex-col gap-8 sm:gap-6 items-center">
        <div className="grid  gap-2 sm:gap-4 ">
          <h3 className="ml-2 text-sm m:text-base font-semibold">Title</h3>
          {error && <p className="text-xs text-red-dark">Please fill first</p>}
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
            type="text"
            disabled={isCreating}
            placeholder="Title..."
          />
        </div>
        <div className="grid gap-2 sm:gap-4 ">
          <h3 className="ml-2 text-sm sm:text-base font-semibold">Choose Category</h3>
          <SelectCategory key="createDeck" onSetCategory={setCategoryId} />
        </div>
        <ButtonSubmit text="Create" onClick={handleSubmit} isLoading={isCreating} />
      </div>
    </form>
  );
};
