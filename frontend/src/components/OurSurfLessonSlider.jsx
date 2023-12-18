// YourMainComponent.jsx
import React from "react";
import { ReusablePhotoSlider } from "./ReusablePhotoSlider";

import slide1 from "../assets/slide1.jpeg";
import slide2 from "../assets/slide2.jpeg";
import slide3 from "../assets/slide3.jpeg";
import slide4 from "../assets/slide4.jpeg";
import slide5 from "../assets/slide5.jpeg";
import slide6 from "../assets/slide6.jpg";

export const OurSurfLessonSlider = () => {
    const images = [slide1, slide2, slide3, slide4, slide5, slide6];

    return (
        <div>
            {/* Other content */}
            <ReusablePhotoSlider images={images} />
            {/* Other content */}
        </div>
    );
};

