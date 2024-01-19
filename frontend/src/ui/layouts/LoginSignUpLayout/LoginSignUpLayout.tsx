import { Outlet } from "react-router-dom";
import { Hanko } from "../../generic/Hanko";
import { Particle } from "../../animation/Particle";

export const LoginSignUpLayout = () => {
  return (
    <div className="grid grid-rows-[2fr_1fr] md:grid-rows-none md:grid-cols-[1fr_3fr] w-screen min-h-screen bg-amber-50">
      <div className="bg-red-light w-full h-full flex md:pt-32 justify-center row-start-2 md:row-auto">
        <div className=" flex flex-col md:h-[340px] pt-10 gap-4 md:justify-between md:pt-0 items-center">
          <Hanko />
          <h1 className="h-fit md:-rotate-90 font-display font-bold text-5xl md:text-[100px] text-amber-50 z-10">
            GENGO
          </h1>
        </div>
      </div>
      <div className="z-10 bg-amber-50/80 w-fit h-fit mx-auto">
        <Outlet />
      </div>
      <Particle />
    </div>
  );
};
