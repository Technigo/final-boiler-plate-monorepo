import { Hanko } from "../../ui/generic/Hanko";
import { welcomeText as text } from "../../statics/texts";

import { ButtonOutline } from "../../ui/buttons/ButtonOutline";
import { Particle } from "../../ui/animation/Particle";

export const WelcomePage = () => {
  return (
    <section className="flex flex-col items-center min-h-screen gap-6 bg-amber-50">
      <div className=" my-12 md:my-16">
        <Hanko />
      </div>
      <div className="w-full px-10 mx-10 max-w-[450px] md:max-w-[600px] z-10 bg-amber-50/90">
        <div>
          <h2 className="font-display text-4xl mb-4 md:text-5xl md:mb-8">Welcome to GENGO 🦔</h2>
          <p className="text-sm mb-4 leading-8 md:text-[18px]  mb:mb-8 ">{text.en.text}</p>

          <ButtonOutline name="Start" bg="bg-red-dark" path="/login" />
        </div>
      </div>
      <Particle />
    </section>
  );
};
