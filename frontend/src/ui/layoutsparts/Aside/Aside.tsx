import { ButtonOutline } from "../../buttons/ButtonOutline";
import { Hanko } from "../../generic/Hanko";
import { Logo } from "../../generic/Logo";
import { navButton as buttonData } from "../../../statics/uiContent";
import { IoMdClose } from "react-icons/io";
import { Dispatch, useCallback, useEffect, useRef } from "react";

type Props = {
  setIsNavOpen: Dispatch<React.SetStateAction<boolean>>;
  isNavOpen: boolean;
};

export const Aside = ({ setIsNavOpen, isNavOpen }: Props) => {
  const asideRef = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      asideRef.current !== null &&
        !asideRef?.current?.contains(e.target as Node) &&
        setIsNavOpen(false);
    },
    [asideRef, setIsNavOpen]
  );

  useEffect(() => {
    isNavOpen
      ? document.addEventListener("mousedown", handleClick)
      : document.removeEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [isNavOpen, handleClick]);

  const buttons = buttonData.map((button) => (
    <ButtonOutline
      name={button.name}
      bg={button.bgColor}
      key={button.name}
      path={button.path}
      onClick={() => setIsNavOpen(false)}
    />
  ));

  return (
    <div className="min-h-screen min-w-screen  bg-gray-400/50 fixed top-0 right-0 left-0 z-[100] ">
      <aside
        className="min-h-screen h-full w-full sm:w-[350px] md:w-[500px] z-[100] relative animate-slideIn bg-amber-50 px-10"
        ref={asideRef}
      >
        <button className="absolute top-4 right-4" onClick={() => setIsNavOpen(false)}>
          <IoMdClose className="w-8 h-8 " />
        </button>
        <div className="py-20 flex flex-col gap-8 items-center  z-[100]">
          <Logo />
          <Hanko />
        </div>

        <div className="py-4 flex flex-col w-fit gap-3 mx-auto">{buttons}</div>
      </aside>
    </div>
  );
};
