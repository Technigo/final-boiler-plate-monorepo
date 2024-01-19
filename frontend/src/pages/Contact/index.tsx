import { ContentFrame } from "../../ui/layoutsparts/ContentFrame";
import { VscGithub } from "react-icons/vsc";
import { PiLinkedinLogo } from "react-icons/pi";
import { Hanko } from "../../ui/generic/Hanko";

export const Contact = () => {
  return (
    <section className="section-layout mx-auto">
      <ContentFrame>
        <h2 className="font-jp font-thin text-xl md:text-2xl text-blue-dark text-center w-full mb-2">
          コンタクト
        </h2>
        <h3 className="mb-10 text-3xl sm:text-5xl font-display">Contact:</h3>
        <Hanko src="/sakura.webp" size="md" />
        <h1 className="mt-4 text-xl sm:text-3xl text-blue-dark font-thin">Sakura Tanaka</h1>
        <address className="text-sm sm:text-base mt-4">
          <a href="mailto:sito6496@gmail.com">
            <p>Email : sito6496@gmail.com</p>
          </a>
        </address>
        <div className="flex gap-8 mt-8">
          <a
            href="https://github.com/sansan-sakura"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Link to Sakura's github"
          >
            <VscGithub className="text-xl sm:text-4xl invert-[0.2]  transition hover:translate-y-0.5 hover:invert-[0.5]" />
          </a>
          <a
            href="https://www.linkedin.com/in/sakura-tanaka-251a36247/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Link to Sakura's linkedin"
          >
            <PiLinkedinLogo className="text-xl sm:text-4xl invert-[0.2]  transition hover:translate-y-0.5 hover:invert-[0.5]" />
          </a>
        </div>
      </ContentFrame>
    </section>
  );
};
