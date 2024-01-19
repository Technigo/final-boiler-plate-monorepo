import { useState } from "react";

import { CategoryType } from "../../../../types/flashcardTypes";
import { EditCategoryModalOption } from "./EditCategoryModalOption";
import { InputSubModalField } from "./InputSubModalField";
import { Dialog, DialogContent } from "../../../../ui/shadcn/Dialog";
import { ButtonSubmit } from "../../../../ui/buttons/ButtonSubmit";

export const EditCategoryInputField = ({ categories }: { categories: CategoryType[] }) => {
  const [isSubOpen, setIsSubOpen] = useState(false);
  return (
    <>
      {isSubOpen && (
        <Dialog open={isSubOpen} onOpenChange={() => setIsSubOpen((prev) => !prev)}>
          <DialogContent>
            <InputSubModalField onClose={setIsSubOpen} />
          </DialogContent>
        </Dialog>
      )}
      <div className="p-2 sm:p-10  text-center">
        <div className="my-4 max-h-[280px] overflow-scroll">
          {categories.length > 0 ? (
            categories.map((cate) => <EditCategoryModalOption cate={cate} key={cate._id} />)
          ) : (
            <p>No category has been created</p>
          )}
        </div>
        <ButtonSubmit onClick={() => setIsSubOpen(true)} text="Create a new Category" />
      </div>
    </>
  );
};
