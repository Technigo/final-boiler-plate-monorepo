import { useRecoilState } from "recoil";
import { Button } from "../../shadcn/Button";
import { modalConfirmState, modalIDstate } from "../../../states/atoms/commonAtoms";
import { useEffect } from "react";

type Props = {
  text: string;
  onClick: (e: React.FormEvent<HTMLButtonElement>) => void;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "link" | "outline" | "default" | "secondary" | "destructive" | "ghost";
  center?: boolean;
  isLoading?: boolean;
};
export const ButtonSubmit = ({
  text,
  center = true,
  size = "default",
  variant = "secondary",
  onClick,
  isLoading,
}: Props) => {
  const [modalId, setMdoalId] = useRecoilState(modalIDstate);
  const [modalConfirmId, setModalConfirmId] = useRecoilState(modalConfirmState);

  //close modal onsubmit
  useEffect(() => {
    if (!isLoading) return;
    const closeModalOnSubmit = () => {
      modalConfirmId && setModalConfirmId(false);
      modalId !== "" && setMdoalId("");
    };
    closeModalOnSubmit();
  }, [onClick, isLoading, modalConfirmId, modalId, setModalConfirmId, setMdoalId]);

  return (
    <Button
      size={size}
      variant={variant}
      onClick={onClick}
      className={`${center ? "mx-auto" : ""} uppercase z-50`}
    >
      {text}
    </Button>
  );
};
