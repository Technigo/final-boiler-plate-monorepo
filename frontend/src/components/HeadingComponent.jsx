import "../font.css"

export const HeadingComponent = ({ text, level, className, style }) => {
    const HeadingTag = `h${level || 1}`;

    return <HeadingTag className="font-moo-lah-lah pt-8 text-3xl lg:text-8xl text-center" style={style}>{text}</HeadingTag>;
};