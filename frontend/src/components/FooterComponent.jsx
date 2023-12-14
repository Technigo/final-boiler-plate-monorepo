import React from 'react';
import { PhotoComponent } from "./PhotoComponent";
import tripAdvicerLogo from "../assets/icons/tripAdvisorLogo.png";
import facebookLogo from "../assets/icons/facebookLogo.png";
import instagramLogo from "../assets/icons/instagramLogo.png";

export const FooterComponent = ({ className }) => {
    // You can use template literals to concatenate Tailwind CSS classes
    const defaultClasses = 'bg-customPink text-l font-josefin-sans md:p-5 bg-backgroundPink'; // You can customize this based on your design

    return (
        <div className="bg-customPink flex flex-col md:flex-row items-center justify-between h-auto">

            <div className="space-x-10 bg-customPink items-center flex md:flex-row md:space-x-20 md:container justify-center items-center">
                <PhotoComponent img={tripAdvicerLogo} />
                <PhotoComponent img={facebookLogo} />
                <PhotoComponent img={instagramLogo} />
            </div>

            <div className="items-center flex flex-col lg:flex-row md:container justify-center items-center">
                <p className={`${defaultClasses} ${className}`}>Email: tuanissurfschool@gmail.com </p>
                <p className={`${defaultClasses} ${className}`}>Phone: +506 6140-7609 </p>
            </div>

        </div>
    );
};



