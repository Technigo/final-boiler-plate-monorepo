// YourMainComponent.jsx
import React from "react";
import { ReusablePhotoSlider } from "../Reusables/ReusablePhotoSlider";

//import relevant media
import slide1 from "../../assets/slide1.webp";
import slide2 from "../../assets/slide2.webp";
import slide3 from "../../assets/slide3.webp";
import slide4 from "../../assets/slide4.webp";
import slide5 from "../../assets/slide5.webp";
import slide6 from "../../assets/slide6.webp";

export const OurSurfLessonSlider = () => {
    const images = [
        { src: slide1, alt: "Picture of somone surfing" },
        { src: slide2, alt: "Picture of somone surfing" },
        { src: slide3, alt: "Picture of somone surfing" },
        { src: slide4, alt: "Picture of somone surfing" },
        { src: slide5, alt: "Picture of somone surfing" },
        { src: slide6, alt: "Picture of somone surfing" },
    ];
    return (

        <div>
            <ReusablePhotoSlider images={images} />
        </div>
    );
};
