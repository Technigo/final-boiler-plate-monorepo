import { ReactNode, useEffect } from "react";
import { SetterOrUpdater } from "recoil";

export const SubModal = ({
  content,
  setIsSubOpen,
}: {
  content: ReactNode;
  setIsSubOpen: SetterOrUpdater<boolean>;
}) => {
  useEffect(() => {
    const closeOnKey = (e: KeyboardEvent) => (e.key === "Escape" ? setIsSubOpen(false) : null);
    document.body.addEventListener("keydown", closeOnKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnKey);
    };
  }, [setIsSubOpen]);

  return (
    <div className="fixed top-0 left-0 backdrop-blur bg-blue-300/30 h-screen w-screen flex items-center justify-center z-[1000]">
      <div className="relative p-12 bg-white border-2 border-black rounded-lg">
        <div>{content}</div>

        <button
          onClick={() => setIsSubOpen(false)}
          className="text-4xl absolute top-3 right-3  text-red-dark"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
