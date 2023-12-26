// ReusablePhotoSlider.jsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PhotoComponent } from "../components/PhotoComponent";
import { FadeWrapper } from "./Fade";
/**
 * ReusablePhotoSlider component displays a photo slider using the react-slick library.
 *
 * @param {Object} props - Component props
 * @param {Array} props.images - Array of image URLs to be displayed in the slider
 * @returns {JSX.Element} - Rendered component
 */
export const ReusablePhotoSlider = ({ images }) => {
    const [slidesToShow, setSlidesToShow] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            // Adjust slidesToShow based on the screen width
            const width = window.innerWidth;
            if (width >= 1024) {
                setSlidesToShow(2.1);
            } else if (width >= 668) {
                setSlidesToShow(1.5);
            } else {
                setSlidesToShow(1.1);
            }
        };

        // Attach resize event listener
        window.addEventListener("resize", handleResize);

        // Initial adjustment
        handleResize();

        // Detach resize event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Configuration for the react-slick slider
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2.1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 667,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    dots: true,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1.1,
                    slidesToScroll: 1

                }
            }
        ]
    };

    return (
        <FadeWrapper>
            <div className="p-10 overflow-x-hidden rounded-lg">
                {/* Use the react-slick Slider component */}
                <Slider {...settings}>
                    {/* Map through the array of images and create a slide for each */}
                    {images.map((image, index) => (
                        <div key={index}>
                            {/* Display each image using the PhotoComponent */}
                            <PhotoComponent className="rounded-3xl p-1 h-52 md:h-auto" img={image} />
                        </div>
                    ))}
                </Slider>
            </div>
        </FadeWrapper>
    );
};
