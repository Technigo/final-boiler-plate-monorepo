import { ReactNode, useEffect } from "react";
import { SetterOrUpdater } from "recoil";

export const Modal = ({
  content,
  setIsOpenModal,
  setModalID,
}: {
  content: ReactNode;
  setIsOpenModal: SetterOrUpdater<boolean>;
  setModalID?: SetterOrUpdater<string>;
}) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? setIsOpenModal(false) : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [setIsOpenModal]);

  return (
    <div className="fixed top-0 left-0 backdrop-blur bg-zinc-300/30 h-screen w-screen flex items-center justify-center z-50">
      <div className="relative p-9 bg-white border-2 border-black rounded-lg ">
        <div>{content}</div>
        <button
          onClick={() => {
            setIsOpenModal(false);
            setModalID && setModalID("");
          }}
          className="text-4xl absolute top-2 right-2"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
