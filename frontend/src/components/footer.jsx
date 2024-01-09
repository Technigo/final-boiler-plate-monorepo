import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";

export const Footer = () => {
  return (
    <section className="bg-secondary">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-5 -my-2">
          <div className="px-5 py-2">
            <a
              href="about"
              className="text-base leading-6 text-gray-500 hover:text-gray-900">
              About
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="contact"
              className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Contact
            </a>
          </div>
          <div className="px-5 py-2">
            <a
              href="followus"
              className="text-base leading-6 text-gray-500 hover:text-gray-900">
              Follow Us
            </a>
          </div>
        </nav>
        <div className="flex justify-center items-center mt-8 gap-3">
          <a
            href="https://www.linkedin.com/"
            className="text-blue-800 hover:text-gray-500"
            target="_blank"
            rel="noopener noreferrer">
            <span className="sr-only">LinkedIn</span>
            <FaLinkedin className="w-12 h-12" />
          </a>
          <a
            href="https://www.facebook.com/"
            className="text-blue-700 hover:text-gray-500"
            target="_blank"
            rel="noopener noreferrer">
            <span className="sr-only">LinkedIn</span>
            <FaFacebookSquare className="w-12 h-12" />
          </a>
          <a
            href="https://twitter.com/"
            className="text-black hover:text-gray-500"
            target="_blank"
            rel="noopener noreferrer">
            <span className="sr-only">LinkedIn</span>
            <FaSquareXTwitter className="w-12 h-12" />
          </a>
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          © 2024 Piggyback, Inc. All rights reserved.
        </p>
      </div>
    </section>
  );
};
