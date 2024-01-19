import { Dialog, DialogContent, DialogHeader } from "../../shadcn/Dialog";
import { useRecoilState } from "recoil";

import { Button } from "../../shadcn/Button";
import { modalConfirmIdState, modalConfirmState } from "../../../states/atoms/commonAtoms";
import { ButtonSubmit } from "../../buttons/ButtonSubmit";

type Props = {
  onClick?: () => void;
  header?: string;
  isLoading?: boolean;
  id?: string;
};

export const ModalConfirm = ({ onClick, header, isLoading, id }: Props) => {
  const [isOpenModalConfirm, setIsOpenModalConfirm] = useRecoilState(modalConfirmState);
  const [modalConfirmId, setModalConfirmId] = useRecoilState(modalConfirmIdState);

  return (
    <Dialog
      open={isOpenModalConfirm || id === modalConfirmId}
      onOpenChange={() => {
        isOpenModalConfirm && setIsOpenModalConfirm((prev) => !prev);
        modalConfirmId.length > 0 && setModalConfirmId("");
      }}
    >
      <DialogContent>
        <DialogHeader className="text-lg mb-10 text-center font-semibold">{header}</DialogHeader>
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              isOpenModalConfirm && setIsOpenModalConfirm((prev) => !prev);
              modalConfirmId.length > 0 && setModalConfirmId("");
            }}
          >
            Cancel
          </Button>
          <ButtonSubmit
            onClick={onClick}
            variant="default"
            text="Confirm"
            isLoading={isLoading}
            center={false}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
