import "../font.css";
//import { FadeWrapper } from "./Fade";
/**
 * A flexible heading component that accepts text, level, className, and style props.
 * @param {Object} props - The component props.
 * @param {string} props.text - The text content of the heading.
 * @param {number} props.level - The heading level (1 to 6). Defaults to 1 if not provided.
 * @param {string} props.className - Additional CSS classes for styling.
 * @param {Object} props.style - Additional inline styles for the heading.
 * @returns {JSX.Element} - The rendered heading element.
 */
export const HeadingComponent = ({ text, level, className, style }) => {
    // Determine the appropriate heading tag based on the provided level (or default to h1)
    const HeadingTag = `h${level || 1}`;

    // Render the heading element with the specified text, className, and style
    return (

        //  <FadeWrapper>
        <HeadingTag className={`rounded-b-full w-auto px-12 pb-44 font-moo-lah-lah text-amber-300 drop-shadow-[0_1.9px_1.9px_rgba(0,1,7,5.9)] pt-8 text-5xl lg:text-8xl text-center rounded-b-full pb-24 bg-gradient-to-b from-backgroundPink from-0% to-transparent to-50% lg:h-screen w-3/5 mx-auto ${className || ''}`} style={style}>{text}</HeadingTag>
        //  </FadeWrapper>
    )
};
