import "../../../src/font.css";
import { Fade } from "react-awesome-reveal";

/**
 * A flexible heading component that accepts text, level, className, and style props.
 * @param {Object} props - The component props.
 * @param {string} props.text - The text content of the heading.
 * @param {number} props.level - The heading level (1 to 6). Defaults to 1 if not provided.
 * @param {string} props.className - Additional CSS classes for styling.
 * @param {Object} props.style - Additional inline styles for the heading.
 * @returns {JSX.Element} - The rendered heading element.
 */
export const HeadingComponent = ({ text, level, className }) => {
    // Determine the appropriate heading tag based on the provided level (or default to h1)
    const HeadingTag = `h${level || 1}`;



    // Render the heading element with the specified text, className, and style
    return (
        <Fade>
            <div className={`bg-backgroundPink p-12 relative w-screen flex flex-col justify-center items-center ${className || ''}`} >
                <HeadingTag className="font-moo-lah-lah text-pink-500 text-8xl text-center">{text}</HeadingTag>
            </div>
        </Fade>
    );
};

