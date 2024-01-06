import "./icon.css";

export const Icon = ({ src, size = "medium", className = "", invert = false, style = {} }) => {
  const iconSizeClasses = {
    small: "icon-small",
    medium: "icon-medium",
    large: "icon-large",
    button: "icon-button"
  };

  const iconClass = `icon ${iconSizeClasses[size]} ${invert ? 'icon-inverted' : ''} ${className}`;

  return (
    <img
      src={src}
      alt=""
      className={iconClass}
      style={style}
      aria-hidden="true"
    />
  );
}