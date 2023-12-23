import "../font.css";

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
    return <HeadingTag className={`font-moo-lah-lah text-amber-300 drop-shadow-md pt-8 text-5xl lg:text-8xl text-center ${className || ''}`} style={style}>{text}</HeadingTag>;
};
