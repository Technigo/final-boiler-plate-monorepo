import "./image.css";

export const Image = ({ src, alt, size = "medium", className = "", style = {} }) => {
    const imageSizeClasses = {
        small: "image-small",
        medium: "image-medium",
        large: "image-large",
    };

    const imageClass = `image ${imageSizeClasses[size]} ${className}`;

    return (
        <img
            src={src}
            alt={alt}
            className={imageClass}
            style={style}
        />
    );
};
