import "../../../src/font.css";
import { Fade } from "react-awesome-reveal";
/**
 * Subheading component with customizable text and additional classes.
 * @param {Object} props - Component props
 * @param {string} props.text - Text content of the subheading
 * @param {string} props.className - Additional classes to apply to the subheading
 * @returns {JSX.Element} - Rendered subheading component
 */
export const SubHeadingComponent = ({ text, className, ...rest }) => {
    // Default classes that can be customized
    const defaultClasses = 'mt-10 text-center text-3xl font-josefin-sans lg:max-w-3xl mx-auto';

    return (
        <Fade>
            <h2 className={`${defaultClasses} ${className}`} {...rest}>
                {text}
            </h2>
        </Fade>
    );
};
