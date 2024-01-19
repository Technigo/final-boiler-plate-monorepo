import { Hanko } from "../../ui/generic/Hanko";

import { aboutText as text } from "../../statics/texts";

export const About = () => {
  return (
    <section className="mx-auto w-10/12 min-w-[360px] max-w-[700px] mt-10">
      <h2 className="font-jp font-thin text-xl md:text-2xl text-blue-dark text-center w-full mb-2">
        ゲンゴについて
      </h2>
      <h3 className="mb-10 text-3xl sm:text-5xl font-display text-center">About:</h3>
      <div className="flex flex-col items-center">
        <Hanko />
        <div className="mt-6 sm:mt-8 text-sm leading-6 sm:text-base sm:leading-7  py-4 px-10 md:px-20">
          {text.en.text}
        </div>
        <div className="flex justify-end w-full">
          <Hanko src="/sakura.webp" size="sm" />
        </div>
      </div>
    </section>
  );
};
