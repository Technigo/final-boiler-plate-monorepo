import { Fade } from "react-awesome-reveal";
/**
 * Button component with customizable label, click handler, image, external link, and additional classes.
 * @param {Object} props - Component props
 * @param {string} props.label - Button label text
 * @param {Function} props.onClick - Click event handler function
 * @param {string} props.img - Image source URL
 * @param {string} props.alt - Image alt text
 * @param {string} props.href - External link URL
 * @param {string} props.target - Link target (e.g., "_blank" for opening in a new tab)
 * @param {string} props.className - Additional classes to apply to the button
 * @param {Object} rest - Additional props to spread onto the button element
 * @returns {JSX.Element} - Rendered button component
 */

export const BtnComponent = ({ label, onClick, img, alt, href, target, className, ...rest }) => {
    // Default Tailwind CSS classes for styling the button
    const defaultClasses = 'mt-5 bg-customPink h-16 w-22 font-josefin-sans text-pink-500 font-bold py-2 px-4 rounded-md hover:bg-opacity-70 hover:-translate-y-1 hover:scale-110 hover:border-11 border-amber-300 hover:text-pink-600 hover:transition-all duration-500';

    // Combine default and additional classes
    const combinedClasses = `${defaultClasses} ${className}`;

    return (
        <Fade>
            <a href={href} target={target} rel="noopener noreferrer" className="no-underline">
                <button onClick={onClick} className={combinedClasses} {...rest}>
                    {img && <img src={img} alt={alt} className="lg:h-3/4 sm:h-full sm:w-full object-contain" />} {/* Render the image if img prop is provided */}
                    {label}
                </button>
            </a>
        </Fade>
    );
};
