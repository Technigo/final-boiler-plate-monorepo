import { CategoryType } from "../../../../types/flashcardTypes";

import { InputSubModalField } from "./InputSubModalField";
import { DeleteBtn } from "../../../../ui/buttons/DeleteBtn";
import { EditBtn } from "../../../../ui/buttons/EditBtn";
import { useState } from "react";
import { useDeleteCategory } from "../../hooks/category/useDeleteCategory";

import { Dialog, DialogContent } from "../../../../ui/shadcn/Dialog";
import { useRecoilState } from "recoil";
import { modalConfirmState } from "../../../../states/atoms/commonAtoms";
import { ModalConfirm } from "../../../../ui/generic/ModalConfirm";

export const EditCategoryModalOption = ({ cate }: { cate: CategoryType }) => {
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useRecoilState(modalConfirmState);
  const { deleteCategory } = useDeleteCategory();

  //handler
  const handledelete = () => {
    deleteCategory(cate._id);
  };

  return (
    <>
      {isSubOpen && (
        <Dialog open={isSubOpen} onOpenChange={() => setIsSubOpen((prev) => !prev)}>
          <DialogContent>
            <InputSubModalField id={cate._id} onClose={setIsSubOpen} defaultValue={cate.category} />
          </DialogContent>
        </Dialog>
      )}
      {isConfirmOpen && (
        <ModalConfirm onClick={handledelete} header="Are you sure to delete this category ?" />
      )}
      <div className="flex justify-between items-center text-xl gap-3 p-2 mb-2">
        <p key={cate._id} className="text-sm sm:text-base">
          {cate.category}
        </p>
        <div className="flex items-center gap-2">
          <EditBtn handleEdit={() => setIsSubOpen(true)} />
          <DeleteBtn handleDelete={() => setConfirmOpen(true)} />
        </div>
      </div>
    </>
  );
};
