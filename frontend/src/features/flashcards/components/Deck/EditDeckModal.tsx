import { useState } from "react";
import { useEditDeck } from "../../hooks/deck/useEditDeck";

import { SelectCategory } from "../Category/SelectCategory";

import { Input } from "../../../../ui/shadcn/Input";
import { ButtonSubmit } from "../../../../ui/buttons/ButtonSubmit";
import { Label } from "../../../../ui/shadcn/Label";

type Props = {
  id: string | undefined;
  title: string;
  category: string;
};

export const EditDeckModal = ({ id, title, category }: Props) => {
  const [titleValue, settitleValue] = useState(title);
  const [categoryValue, setCategoryValue] = useState(category);
  const { isEditing, editDeck } = useEditDeck();
  const handleEdit = () => {
    if (id === undefined) return;
    if (titleValue === "" || categoryValue === "") return alert("Please fill category and title");
    const newData = { title: titleValue, category: categoryValue };
    editDeck({ id, newData });
  };
  return (
    <div className="flex flex-col gap-8 sm:gap-4 items-center">
      <div className="grid gap-2">
        <Label htmlFor="category" className="text-xs sm:text-sm font-semibold">
          category
        </Label>
        <SelectCategory
          currentCategory={categoryValue}
          key="editDeck"
          onSetCategory={setCategoryValue}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="title" className="text-xs sm:text-sm font-semibold">
          title
        </Label>
        <Input
          id="title"
          value={titleValue}
          onChange={(e) => settitleValue(e.target.value)}
          className=""
        />
      </div>
      <ButtonSubmit text="Edit" onClick={handleEdit} isLoading={isEditing} />
    </div>
  );
};
