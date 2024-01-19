import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader } from "../../shadcn/Dialog";
import { useRecoilState } from "recoil";
import { modalIDstate } from "../../../states/atoms/commonAtoms";

type Props = {
  children: ReactNode;
  customContentClass?: string;
  header?: string;
  id: string;
};

export const CustomDialog = ({ children, header, id, customContentClass }: Props) => {
  const [modalId, setModalId] = useRecoilState(modalIDstate);
  return (
    <Dialog
      open={modalId === id}
      onOpenChange={() => {
        modalId !== "" && setModalId("");
      }}
    >
      <DialogContent className={customContentClass}>
        <DialogHeader className="text-xl font-semibold">{header}</DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
