import { FadeWrapper } from "./Fade";
/**
 * Image component with customizable source, alt text, and additional classes.
 * @param {Object} props - Component props
 * @param {string} props.img - Image source URL
 * @param {string} props.alt - Alt text for the image
 * @param {string} props.className - Additional classes to apply to the image
 * @param {Object} rest - Additional props to spread onto the image element
 * @returns {JSX.Element} - Rendered image component
 */
export const PhotoComponent = ({ img, alt, className, ...rest }) => {
    return (

        <FadeWrapper>
            <img src={img} alt={alt} className={className} {...rest} />
        </FadeWrapper>

    );
};
