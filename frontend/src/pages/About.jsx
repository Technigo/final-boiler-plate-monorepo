import { Chat } from "../components/Chat";
import { UserProfile } from "./UserProfile";

export const About = () => {
  return (
    <>
      <div className="sm:mt-8 mt-2 space-y-4 mx-auto max-w-screen-md bg-yellow-50 mb-8 border-dashed border-2 border-yellow-500 p-4 rounded-xl">
        <h1 className="text-lg font-md font-semibold">
          This is our final project of Technigo Web Development Bootcamp fall
          2023.
        </h1>
        <h2 className="text-md mb-2">
          These were the technical and visual requirements:
        </h2>
        <ul className="flex flex-col items-start">
          <li className="flex items-center leading-relaxed">
            <span role="img" aria-label="Check Mark" className="mr-2">
              ✔️
            </span>
            Frontend in React
          </li>
          <li className="flex items-center leading-relaxed">
            <span role="img" aria-label="Check Mark" className="mr-2">
              ✔️
            </span>
            Backend in Node.js
          </li>
          <li className="flex items-center leading-relaxed">
            <span role="img" aria-label="Check Mark" className="mr-2">
              ✔️
            </span>
            MongoDB database
          </li>
          <li className="flex items-center leading-relaxed">
            <span role="img" aria-label="Check Mark" className="mr-2">
              ✔️
            </span>
            Navigation using React Router
          </li>
          <li className="flex items-center leading-relaxed">
            <span role="img" aria-label="Check Mark" className="mr-2">
              ✔️
            </span>
            Should work in Chrome, Firefox & Safari
          </li>
          <li className="flex items-center leading-relaxed">
            <span role="img" aria-label="Check Mark" className="mr-2">
              ✔️
            </span>
            Be responsive and work well on mobile, tablet and desktop
          </li>
          <li className="flex items-center leading-relaxed">
            <span role="img" aria-label="Check Mark" className="mr-2">
              ✔️
            </span>
            Follow the accessibility guidelines
          </li>
          <li className="flex items-center leading-relaxed">
            <span role="img" aria-label="Check Mark" className="mr-2">
              ✔️
            </span>
            Your application should have a clear structure, using the box model
            as a reference, with consistent margins/paddings
          </li>
          <li className="flex items-center leading-relaxed">
            <span role="img" aria-label="Check Mark" className="mr-2">
              ✔️
            </span>
            You should use consistent h1-h6 styles and sizes throughout your
            site and for multiple devices
          </li>
          <li className="flex items-center leading-relaxed">
            <span role="img" aria-label="Check Mark" className="mr-2">
              ✔️
            </span>
            You should use a colour scheme based on one or a few colours
          </li>
          <li className="flex items-center leading-relaxed">
            <span role="img" aria-label="Check Mark" className="mr-2">
              ✔️
            </span>
            You should have a design that can be adjusted to fit devices of all
            sizes. Remember that 58.43% (Mar 2023) of all users will visit your
            page from a mobile device and that the page should therefore be
            optimised for these users too
          </li>
        </ul>
      </div>
    </>
  );
};
