//import "./image.css";

export const Image = ({ sectionClassName, elementClassName, link, ImageAltText }) => {
    return (
        <section className={sectionClassName}>
            <img className={elementClassName} src={link} alt={ImageAltText} />
        </section>
    )
}